const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MercadoPagoConfig, Payment } = require('mercadopago');
const path = require('path');
const rateLimit = require('express-rate-limit'); // Importa a proteção
require('dotenv').config();

// 1. CRIA O APP (Isso tem que vir antes de tudo)
const app = express();

// 2. CONFIGURAÇÕES BÁSICAS
app.use(express.json());
app.use(cors()); // Em produção, restrinja isso: app.use(cors({ origin: 'seusite.com' }));

// 3. SEGURANÇA: RATE LIMIT (Proteção contra força bruta)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // Limite de 10 tentativas por IP
    message: "Muitas tentativas de login. Tente novamente mais tarde."
});
// Aplica a proteção apenas na rota de login
app.use('/api/login', loginLimiter);

// 4. ARQUIVOS PÚBLICOS (FRONTEND)
// Define que a pasta 'public' é a única acessível pelo navegador
app.use(express.static(path.join(__dirname, 'public')));

// 5. ROTA INICIAL (Garante que ao entrar no site, abra o indexT1.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'indexT1.html'));
});

// --- CONFIGURAÇÃO MERCADO PAGO ---
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

// --- ROTAS DA API ---

// ROTA DE CONFIGURAÇÃO
app.get('/api/config', (req, res) => {
    res.json({ publicKey: process.env.MP_PUBLIC_KEY });
});

// REGISTRAR USUÁRIO
app.post('/api/register', async (req, res) => {
    const { name, email, whatsapp, password } = req.body;
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length > 0 && user[0].status === 'active') {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }
        if (user.length > 0 && user[0].status === 'pending') {
            await pool.query('DELETE FROM sales WHERE user_id = ?', [user[0].id]);
            await pool.query('DELETE FROM users WHERE id = ?', [user[0].id]);
        }

        const hash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (name, email, whatsapp, password_hash, status) VALUES (?, ?, ?, ?, "pending")',
            [name, email, whatsapp, hash]
        );
        res.json({ userId: result.insertId, email });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro no cadastro.' });
    }
});

// PROCESSAR PAGAMENTO
app.post('/api/create-payment', async (req, res) => {
    const { userId, email, type, token, issuerId, paymentMethodId, payer } = req.body;
    console.log(`💳 Processando ${type} para: ${email}`);

    try {
        const payment = new Payment(client);
        let body = {};

        if (type === 'card') {
            body = {
                transaction_amount: 19.90,
                token: token,
                description: 'Acesso Próxyz Library',
                payment_method_id: paymentMethodId,
                issuer_id: issuerId,
                installments: 1,
                payer: { email: email, identification: payer.identification },
                notification_url: process.env.WEBHOOK_URL
            };
        } else {
            body = {
                transaction_amount: 19.90,
                description: 'Acesso Próxyz Library',
                payment_method_id: 'pix',
                payer: { email: email },
                notification_url: process.env.WEBHOOK_URL
            };
        }

        const result = await payment.create({ body });
        const statusVenda = result.status === 'approved' ? 'paid' : 'pending';
        const pixInfo = type === 'pix' ? result.point_of_interaction.transaction_data.qr_code : 'CARD';

        await pool.query(
            'INSERT INTO sales (user_id, amount, status, transaction_id, pix_code) VALUES (?, 19.90, ?, ?, ?)',
            [userId, statusVenda, result.id, pixInfo]
        );

        if (result.status === 'approved') {
            await pool.query('UPDATE users SET status = "active" WHERE id = ?', [userId]);
            return res.json({ status: 'approved' });
        }

        res.json({
            status: result.status,
            qr_code: type === 'pix' ? pixInfo : null,
            qr_code_base64: type === 'pix' ? result.point_of_interaction.transaction_data.qr_code_base64 : null
        });

    } catch (error) {
        console.error("Erro MP:", error);
        res.status(500).json({ error: 'Erro ao processar pagamento.' });
    }
});

// CANCELAR / LIMPAR
app.post('/api/cancel-register', async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.json({ ok: true });
    try {
        await pool.query('DELETE FROM sales WHERE user_id = ?', [userId]);
        await pool.query('DELETE FROM users WHERE id = ?', [userId]);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao limpar dados.' });
    }
});

// LOGIN E STATUS
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0 || !(await bcrypt.compare(password, users[0].password_hash))) {
        return res.status(400).json({ error: 'Dados incorretos.' });
    }
    if (users[0].status !== 'active') {
        return res.status(403).json({ error: 'Pagamento pendente.', payment_required: true, userId: users[0].id, email: users[0].email });
    }
    const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET);
    res.json({ token, user: { name: users[0].name } });
});

app.get('/api/check-status/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT status FROM users WHERE id = ?', [req.params.id]);
    res.json({ status: rows.length ? rows[0].status : 'unknown' });
});

// ROTA DE PROMPTS (PROTEGIDA)
app.get('/api/prompts', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        try {
            // AQUI VOCÊ PODE BUSCAR DO BANCO DE DADOS FUTURAMENTE
            // Por enquanto, retorna a lista estática
            const prompts = [
                { category: 'MARKETING', title: 'Copy AIDA Vendas', description: 'Framework clássico de Atenção, Interesse, Desejo e Ação.', content: 'Atue como um especialista em Copywriting. Escreva um texto de vendas seguindo a estrutura AIDA para o produto [PRODUTO] focado no público [PÚBLICO]...' },
                { category: 'DEV', title: 'Refatorador Clean Code', description: 'Otimiza funções complexas para legibilidade.', content: 'Analise o seguinte código e refatore aplicando princípios de Clean Code e SOLID: [CÓDIGO]' },
                { category: 'DESIGN', title: 'Prompt Midjourney V6', description: 'Gera imagens fotorrealistas.', content: '/imagine prompt: cinematic shot of [SUBJECT], 8k, hyper-realistic, dramatic lighting --v 6.0' }
            ];
            res.json(prompts);
        } catch (e) {
            res.sendStatus(500);
        }
    });
});

// WEBHOOK
app.post('/api/webhook', async (req, res) => {
    const { type, data } = req.body;
    res.sendStatus(200);
    if (type === 'payment') {
        try {
            const payment = new Payment(client);
            const info = await payment.get({ id: data.id });
            if (info.status === 'approved') {
                await pool.query('UPDATE sales SET status = "paid" WHERE transaction_id = ?', [data.id]);
                const [sale] = await pool.query('SELECT user_id FROM sales WHERE transaction_id = ?', [data.id]);
                if (sale.length) await pool.query('UPDATE users SET status = "active" WHERE id = ?', [sale[0].user_id]);
            }
        } catch(e) {}
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🔥 Server ON porta ${PORT}`));