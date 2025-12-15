const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { MercadoPagoConfig, Payment } = require('mercadopago');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('.'));

// --- CONFIGURAÇÕES ---
// Verificação de segurança ao iniciar
if (!process.env.MP_ACCESS_TOKEN) {
    console.error("CRÍTICO: Token do Mercado Pago não encontrado no .env!");
}

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// --- ROTAS ---

// 1. CADASTRO
app.post('/api/register', async (req, res) => {
    const { name, email, whatsapp, password } = req.body;
    try {
        const [userCheck] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (userCheck.length > 0) return res.status(400).json({ error: 'E-mail já cadastrado.' });

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const [result] = await pool.query(
            'INSERT INTO users (name, email, whatsapp, password_hash) VALUES (?, ?, ?, ?)',
            [name, email, whatsapp, hashPass]
        );
        res.json({ message: 'Usuário criado!', userId: result.insertId, email: email });
    } catch (err) {
        console.error("Erro Cadastro:", err);
        res.status(500).json({ error: 'Erro ao cadastrar.' });
    }
});

// 2. LOGIN
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(400).json({ error: 'Usuário não encontrado.' });

        const user = users[0];
        const validPass = await bcrypt.compare(password, user.password_hash);
        if (!validPass) return res.status(400).json({ error: 'Senha incorreta.' });

        if (user.status !== 'active') {
            return res.status(403).json({ 
                error: 'Pagamento pendente.', 
                payment_required: true, 
                userId: user.id,
                email: user.email
            });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ message: 'Logado!', token, user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: 'Erro no login.' });
    }
});

// 3. GERAR PIX (Com Logs de Debug)
app.post('/api/create-payment', async (req, res) => {
    const { userId, email } = req.body;
    console.log(`🚀 Iniciando criação de PIX para: ${email} (ID: ${userId})`);

    try {
        const payment = new Payment(client);
        
        const requestBody = {
            transaction_amount: 19.90,
            description: 'Acesso Próxyz',
            payment_method_id: 'pix',
            payer: { email: email },
            notification_url: process.env.WEBHOOK_URL
        };

        console.log("📦 Dados enviados para o MP:", JSON.stringify(requestBody, null, 2));

        const result = await payment.create({ body: requestBody });

        console.log("✅ Resposta do MP recebida. Status:", result.status);

        if (!result.point_of_interaction) {
            console.error("❌ ERRO: Mercado Pago não devolveu o QR Code. Resposta completa:", result);
            return res.status(500).json({ error: 'Mercado Pago não gerou o QR Code.' });
        }

        await pool.query(
            'INSERT INTO sales (user_id, amount, status, pix_code, transaction_id) VALUES (?, ?, ?, ?, ?)',
            [userId, 19.90, 'pending', result.point_of_interaction.transaction_data.qr_code, result.id]
        );

        res.json({
            qr_code: result.point_of_interaction.transaction_data.qr_code,
            qr_code_base64: result.point_of_interaction.transaction_data.qr_code_base64
        });

    } catch (error) {
        console.error("🔥 ERRO FATAL AO CRIAR PIX:", error);
        // Tenta mostrar a mensagem de erro específica do MP, se houver
        const msg = error.cause ? JSON.stringify(error.cause) : error.message;
        res.status(500).json({ error: 'Erro ao gerar PIX: ' + msg });
    }
});

// 4. CANCELAR CADASTRO (NOVO)
// Se o usuário desistir de pagar, chamamos isso para limpar o banco
app.post('/api/cancel-register', async (req, res) => {
    const { userId } = req.body;
    try {
        // Só deleta se estiver pendente (segurança)
        const [user] = await pool.query('SELECT status FROM users WHERE id = ?', [userId]);
        
        if (user.length > 0 && user[0].status === 'pending') {
            await pool.query('DELETE FROM users WHERE id = ?', [userId]);
            console.log(`🗑️ Usuário pendente ${userId} deletado por desistência.`);
            res.json({ message: 'Cancelado com sucesso.' });
        } else {
            res.status(400).json({ error: 'Não foi possível cancelar.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao cancelar.' });
    }
});

// 5. WEBHOOK
app.post('/api/webhook', async (req, res) => {
    const { type, data } = req.body;
    try {
        if (type === 'payment' || (req.body.action === 'payment.created')) {
            const id = data?.id || req.body.data?.id;
            const payment = new Payment(client);
            const paymentInfo = await payment.get({ id: id });

            if (paymentInfo.status === 'approved') {
                console.log(`💰 Pagamento Aprovado: ${id}`);
                await pool.query('UPDATE sales SET status = "paid" WHERE transaction_id = ?', [id]);
                const [sale] = await pool.query('SELECT user_id FROM sales WHERE transaction_id = ?', [id]);
                if (sale.length > 0) {
                    await pool.query('UPDATE users SET status = "active" WHERE id = ?', [sale[0].user_id]);
                }
            }
        }
    } catch (e) { console.error("Erro Webhook:", e); }
    res.sendStatus(200);
});

// 6. CHECK STATUS
app.get('/api/check-status/:userId', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT status FROM users WHERE id = ?', [req.params.userId]);
        if (users.length > 0) res.json({ status: users[0].status });
        else res.status(404).json({ error: 'User not found' });
    } catch (error) { res.status(500).json({ error: 'Erro ao verificar' }); }
});

// 7. RECUPERAÇÃO DE SENHA E LISTAR PROMPTS (Mantenha as outras rotas iguais...)
// (Vou resumir aqui para não ficar gigante, mas mantenha as rotas de forgot-password, reset-password e prompts que já funcionavam)
app.post('/api/forgot-password', async (req, res) => {
    // ... (Código do Nodemailer que fizemos antes) ...
    // Copie do arquivo anterior se precisar, ou me avise.
    res.json({ message: 'Funcionalidade resumida para caber na resposta.' }); 
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));