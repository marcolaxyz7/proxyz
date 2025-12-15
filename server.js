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
app.use(express.static('.')); // Serve o index.html

// --- VERIFICAÇÕES DE SEGURANÇA ---
if (!process.env.MP_ACCESS_TOKEN) console.error("⚠️  FALTA MP_ACCESS_TOKEN NO .ENV");
if (!process.env.MP_PUBLIC_KEY) console.error("⚠️  FALTA MP_PUBLIC_KEY NO .ENV");

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

// --- ROTAS ---

// 1. CONFIG (Envia a chave pública pro Front)
app.get('/api/config', (req, res) => {
    res.json({ publicKey: process.env.MP_PUBLIC_KEY });
});

// 2. CADASTRO (Cria pendente)
app.post('/api/register', async (req, res) => {
    const { name, email, whatsapp, password } = req.body;
    try {
        const [exists] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        // Se já existe e está ativo, erro.
        if (exists.length > 0 && exists[0].status === 'active') {
            return res.status(400).json({ error: 'E-mail já possui conta ativa.' });
        }
        
        // Se existe mas está pendente (tentou e não pagou), limpamos pra recriar
        if (exists.length > 0 && exists[0].status === 'pending') {
            await pool.query('DELETE FROM sales WHERE user_id = ?', [exists[0].id]);
            await pool.query('DELETE FROM users WHERE id = ?', [exists[0].id]);
        }

        const hash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (name, email, whatsapp, password_hash, status) VALUES (?, ?, ?, ?, "pending")',
            [name, email, whatsapp, hash]
        );
        
        res.json({ userId: result.insertId, email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro no banco de dados.' });
    }
});

// 3. CRIAR PAGAMENTO (PIX ou CARTÃO)
app.post('/api/create-payment', async (req, res) => {
    const { userId, email, type, token, issuerId, paymentMethodId, payer, installments } = req.body;
    
    console.log(`💳 Processando ${type} para User ${userId}`);

    try {
        const payment = new Payment(client);
        let body = {};

        if (type === 'card') {
            // DADOS PARA CARTÃO (Tokenizado)
            body = {
                transaction_amount: 19.90,
                token: token,
                description: 'Acesso Próxyz Library',
                payment_method_id: paymentMethodId,
                issuer_id: issuerId,
                installments: Number(installments) || 1, // Força à vista se não vier nada
                payer: {
                    email: email,
                    identification: payer.identification
                },
                notification_url: process.env.WEBHOOK_URL
            };
        } else {
            // DADOS PARA PIX
            body = {
                transaction_amount: 19.90,
                description: 'Acesso Próxyz Library',
                payment_method_id: 'pix',
                payer: { email: email },
                notification_url: process.env.WEBHOOK_URL
            };
        }

        const result = await payment.create({ body });

        // Salva venda no banco (Define status inicial)
        const statusVenda = result.status === 'approved' ? 'paid' : 'pending';
        const pixCode = type === 'pix' ? result.point_of_interaction?.transaction_data?.qr_code : 'CARD_PAYMENT';
        
        await pool.query(
            'INSERT INTO sales (user_id, amount, status, transaction_id, pix_code) VALUES (?, ?, ?, ?, ?)',
            [userId, 19.90, statusVenda, result.id, pixCode]
        );

        // Se o cartão foi aprovado na hora, libera o usuário
        if (result.status === 'approved') {
            await pool.query('UPDATE users SET status = "active" WHERE id = ?', [userId]);
            return res.json({ status: 'approved' });
        }

        // Retorno para o Front
        res.json({
            status: result.status,
            qr_code: pixCode !== 'CARD_PAYMENT' ? pixCode : null,
            qr_code_base64: result.point_of_interaction?.transaction_data?.qr_code_base64
        });

    } catch (error) {
        console.error("Erro MP:", error);
        const msg = error.cause && error.cause[0] ? error.cause[0].description : error.message;
        res.status(500).json({ error: 'Erro no pagamento: ' + msg });
    }
});

// 4. CANCELAR / LIMPEZA (CORRIGIDO PARA O SEU ERRO)
app.post('/api/cancel-register', async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.json({ ok: true });

    console.log(`🗑️ Solicitado cancelamento para ID: ${userId}`);

    try {
        // 1. Apaga vendas primeiro (devido à chave estrangeira/Foreign Key)
        await pool.query('DELETE FROM sales WHERE user_id = ?', [userId]);
        
        // 2. Apaga o usuário depois
        await pool.query('DELETE FROM users WHERE id = ?', [userId]);
        
        console.log(`✅ Limpeza concluída para o ID ${userId}`);
        res.json({ success: true });
    } catch (err) {
        console.error("Erro ao cancelar:", err);
        res.status(500).json({ error: 'Falha na limpeza.' });
    }
});

// 5. STATUS DO PAGAMENTO
app.get('/api/check-status/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT status FROM users WHERE id = ?', [req.params.id]);
    res.json({ status: rows.length ? rows[0].status : 'unknown' });
});

// 6. LOGIN
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) return res.status(400).json({ error: 'Usuário não encontrado.' });

        const valid = await bcrypt.compare(password, users[0].password_hash);
        if (!valid) return res.status(400).json({ error: 'Senha incorreta.' });

        if (users[0].status !== 'active') {
            return res.status(403).json({ 
                error: 'Pagamento pendente.', 
                payment_required: true,
                userId: users[0].id,
                email: users[0].email
            });
        }

        const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET);
        res.json({ token, user: { name: users[0].name } });
    } catch (err) { res.status(500).json({ error: 'Erro interno.' }); }
});

// 7. WEBHOOK (Notificações do Mercado Pago)
app.post('/api/webhook', async (req, res) => {
    const { type, data } = req.body;
    res.sendStatus(200); // Responde OK rápido

    try {
        if (type === 'payment' || req.body?.action === 'payment.created') {
            const id = data?.id || req.body?.data?.id;
            const payment = new Payment(client);
            const info = await payment.get({ id });

            if (info.status === 'approved') {
                console.log(`💰 Webhook: Pagamento Aprovado (${id})`);
                await pool.query('UPDATE sales SET status = "paid" WHERE transaction_id = ?', [id]);
                const [sale] = await pool.query('SELECT user_id FROM sales WHERE transaction_id = ?', [id]);
                if (sale.length > 0) {
                    await pool.query('UPDATE users SET status = "active" WHERE id = ?', [sale[0].user_id]);
                }
            }
        }
    } catch (e) { console.error("Webhook Error:", e.message); }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🔥 Servidor rodando na porta ${PORT}`));