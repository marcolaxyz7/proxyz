const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MercadoPagoConfig, Payment } = require('mercadopago');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('.'));

// Configuração MP
if (!process.env.MP_ACCESS_TOKEN) console.error("⚠️  FALTA O TOKEN DO MERCADO PAGO NO .ENV");
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

// --- ROTAS ---

// 1. REGISTER
app.post('/api/register', async (req, res) => {
    const { name, email, whatsapp, password } = req.body;
    try {
        const [exists] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (exists.length > 0) return res.status(400).json({ error: 'E-mail já cadastrado.' });

        const hash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (name, email, whatsapp, password_hash, status) VALUES (?, ?, ?, ?, "pending")',
            [name, email, whatsapp, hash]
        );
        res.json({ userId: result.insertId, email });
    } catch (err) { res.status(500).json({ error: 'Erro no banco de dados.' }); }
});

// 2. CREATE PAYMENT (Onde dá o erro do QR Code)
app.post('/api/create-payment', async (req, res) => {
    const { userId, email } = req.body;
    
    // Log para você ver no terminal
    console.log(`💳 Gerando PIX para ID: ${userId}, Email: ${email}`);
    
    try {
        const payment = new Payment(client);
        const result = await payment.create({
            body: {
                transaction_amount: 19.90,
                description: 'Acesso Próxyz',
                payment_method_id: 'pix',
                payer: { email: email },
                notification_url: process.env.WEBHOOK_URL // Tem que estar correto no .env!
            }
        });

        // Se não tiver QR code na resposta, mostra o erro
        if (!result.point_of_interaction) {
            console.error("❌ Erro MP:", result);
            return res.status(500).json({ error: 'Falha ao obter QR Code do Mercado Pago.' });
        }

        // Salva venda
        await pool.query('INSERT INTO sales (user_id, amount, status, transaction_id) VALUES (?, 19.90, "pending", ?)', [userId, result.id]);

        res.json({
            qr_code: result.point_of_interaction.transaction_data.qr_code,
            qr_code_base64: result.point_of_interaction.transaction_data.qr_code_base64
        });

    } catch (error) {
        console.error("🔥 Erro Fatal MP:", error);
        res.status(500).json({ error: 'Erro na integração com Mercado Pago. Verifique o terminal.' });
    }
});

// 3. CANCEL REGISTER (Apaga usuário se desistir - Resolve o erro 2)
app.post('/api/cancel-register', async (req, res) => {
    const { userId } = req.body;
    // Só apaga se estiver pendente, por segurança
    await pool.query('DELETE FROM users WHERE id = ? AND status = "pending"', [userId]);
    console.log(`🗑️ Usuário ${userId} cancelado e removido.`);
    res.json({ ok: true });
});

// 4. CHECK STATUS (Botão "Já paguei")
app.get('/api/check-status/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT status FROM users WHERE id = ?', [req.params.id]);
    res.json({ status: rows.length ? rows[0].status : 'unknown' });
});

// 5. LOGIN
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0 || !(await bcrypt.compare(password, users[0].password_hash))) {
        return res.status(400).json({ error: 'Credenciais inválidas.' });
    }
    
    if (users[0].status !== 'active') {
        return res.status(403).json({ error: 'Pagamento pendente.', payment_required: true });
    }

    const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET);
    res.json({ token, user: { name: users[0].name } });
});

// 6. WEBHOOK (Recebe confirmação do MP)
app.post('/api/webhook', async (req, res) => {
    const { type, data } = req.body;
    if (type === 'payment') {
        const payment = new Payment(client);
        try {
            const info = await payment.get({ id: data.id });
            if (info.status === 'approved') {
                console.log(`💰 Pagamento Aprovado: ${data.id}`);
                const [sale] = await pool.query('SELECT user_id FROM sales WHERE transaction_id = ?', [data.id]);
                if (sale.length) {
                    await pool.query('UPDATE users SET status = "active" WHERE id = ?', [sale[0].user_id]);
                }
            }
        } catch (e) { console.error(e); }
    }
    res.sendStatus(200);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🔥 Servidor ON na porta ${PORT}`));