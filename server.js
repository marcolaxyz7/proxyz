// 1. CORREÇÃO VITAL: O dotenv TEM QUE SER A PRIMEIRA LINHA!
require('dotenv').config();

const express = require('express');
const cors = require('cors');

// --- DEBUG DE VARIÁVEIS (Para termos certeza que a Hostinger leu) ---
console.log("========================================");
console.log("🔍 CHECKUP INICIAL:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("Stripe Key:", process.env.STRIPE_SECRET_KEY ? "OK (Carregada)" : "VAZIA (ERRO)");
console.log("========================================");

// 2. Agora sim importamos o banco (ele já vai achar as senhas)
const pool = require('./db'); 

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { MercadoPagoConfig, Payment, Preference } = require('mercadopago');
const fs = require('fs');

// Configuração do Stripe (Com proteção para não travar se a chave falhar)
const stripeKey = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_para_nao_travar";
const stripe = require('stripe')(stripeKey);

// Importa os prompts
const promptsData = require('./prompts');

const app = express();

// 3. CORREÇÃO DO ERRO 'X-Forwarded-For' (Obrigatório na Hostinger)
app.set('trust proxy', 1); 

app.use(express.json());
app.use(cors());

// Configuração do Rate Limit
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10, 
    message: "Muitas tentativas de login. Tente novamente mais tarde.",
    standardHeaders: true, 
    legacyHeaders: false,
});
app.use('/api/login', loginLimiter);

// Arquivos Públicos
app.use(express.static(path.join(__dirname, 'public')));

// Rota Inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'indexT1.html'));
});

// Mercado Pago Config
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

// --- ROTAS DA API ---

app.get('/api/config', (req, res) => {
    res.json({ publicKey: process.env.MP_PUBLIC_KEY });
});

app.post('/api/register', async (req, res) => {
    const { name, email, whatsapp, password } = req.body;
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (user.length > 0 && user[0].status === 'active') {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }

        if (user.length > 0 && user[0].status === 'pending') {
            try {
                await pool.query('DELETE FROM prompt_logs WHERE user_id = ?', [user[0].id]);
                await pool.query('DELETE FROM sales WHERE user_id = ?', [user[0].id]);
                await pool.query('DELETE FROM users WHERE id = ?', [user[0].id]);
            } catch (delError) {
                console.error("Erro ao limpar usuário pendente:", delError);
            }
        }

        const hash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (name, email, whatsapp, password_hash, status) VALUES (?, ?, ?, ?, "pending")',
            [name, email, whatsapp, hash]
        );
        res.json({ userId: result.insertId, email });
    } catch (err) {
        console.error("Erro Registro:", err);
        res.status(500).json({ error: 'Erro no cadastro.' });
    }
});

app.post('/api/create-preference', async (req, res) => {
    const { userId, email, title, price } = req.body;

    try {
        const preference = new Preference(client);

        const body = {
            items: [
                {
                    id: 'proxyz-access',
                    title: title || 'Acesso Próxyz Library',
                    quantity: 1,
                    unit_price: Number(price)
                }
            ],
            payer: { email: email },
            external_reference: String(userId),
            back_urls: {
                // ATENÇÃO: Confirme se este é seu domínio novo
                success: 'https://xn--prxyz-1ta.com/indexT1.html?payment=mp_approved',
                failure: 'https://xn--prxyz-1ta.com/indexT1.html?payment=mp_failure',
                pending: 'https://xn--prxyz-1ta.com/indexT1.html?payment=mp_pending'
            },
            auto_return: 'approved',
            notification_url: process.env.WEBHOOK_URL
        };

        const result = await preference.create({ body });
        
        await pool.query(
            'INSERT INTO sales (user_id, amount, status, transaction_id, pix_code) VALUES (?, ?, "pending", ?, "CheckoutPro")',
            [userId, price, result.id]
        );

        res.json({ init_point: result.init_point });

    } catch (error) {
        console.error("Erro Criar Preferência:", error);
        res.status(500).json({ error: 'Erro ao gerar link de pagamento.' });
    }
});

app.post('/api/create-payment', async (req, res) => {
    const { userId, email, type, token, issuerId, paymentMethodId, payer } = req.body;
    
    try {
        const payment = new Payment(client);
        let body = {};
        const AMOUNT_BRL = 5.00;

        if (type === 'card') {
            body = {
                transaction_amount: AMOUNT_BRL,
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
                transaction_amount: AMOUNT_BRL,
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
            'INSERT INTO sales (user_id, amount, status, transaction_id, pix_code) VALUES (?, ?, ?, ?, ?)',
            [userId, AMOUNT_BRL, statusVenda, result.id, pixInfo]
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

// --- ROTA BRICK (CARTÃO/DÉBITO) ---
app.post('/api/process-brick', async (req, res) => {
    const { formData, userId, email } = req.body;
    
    try {
        const payment = new Payment(client);
        
        const body = {
            ...formData,
            transaction_amount: 5.00, 
            description: 'Acesso Próxyz Library',
            payer: {
                email: email,
                ...formData.payer
            },
            notification_url: process.env.WEBHOOK_URL
        };

        const result = await payment.create({ body });
        const statusVenda = result.status === 'approved' ? 'paid' : 'pending';
        
        await pool.query(
            'INSERT INTO sales (user_id, amount, status, transaction_id, pix_code) VALUES (?, ?, ?, ?, ?)',
            [userId, 1.00, statusVenda, result.id, 'BrickCard']
        );

        if (result.status === 'approved') {
            await pool.query('UPDATE users SET status = "active" WHERE id = ?', [userId]);
            return res.json({ status: 'approved' });
        }

        res.json({ status: result.status });

    } catch (error) {
        console.error("Erro Brick:", error);
        res.status(500).json({ error: 'Erro ao processar pagamento via Brick.' });
    }
});

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

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0 || !(await bcrypt.compare(password, users[0].password_hash))) {
            return res.status(400).json({ error: 'Dados incorretos.' });
        }
        if (users[0].status !== 'active') {
            return res.status(403).json({ error: 'Pagamento pendente.', payment_required: true, userId: users[0].id, email: users[0].email });
        }
        const token = jwt.sign({ id: users[0].id }, process.env.JWT_SECRET);
        res.json({ token, user: { name: users[0].name } });
    } catch (error) {
        console.error("Erro Login:", error);
        res.status(500).json({ error: 'Erro interno no servidor.' });
    }
});

app.get('/api/check-status/:id', async (req, res) => {
    const [rows] = await pool.query('SELECT status FROM users WHERE id = ?', [req.params.id]);
    res.json({ status: rows.length ? rows[0].status : 'unknown' });
});

// --- ROTA DE PROMPTS ---
app.get('/api/prompts', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        try {
            res.json(promptsData);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    });
});

app.post('/api/webhook', async (req, res) => {
    const { type, data } = req.body;
    res.sendStatus(200);

    if (type === 'payment') {
        try {
            const payment = new Payment(client);
            const info = await payment.get({ id: data.id });

            if (info.status === 'approved') {
                const userId = info.external_reference;

                if (userId) {
                    console.log(`Webhook: Pagamento aprovado para User ID ${userId}`);
                    await pool.query('UPDATE users SET status = "active" WHERE id = ?', [userId]);
                    await pool.query(
                        'UPDATE sales SET status = "paid", transaction_id = ? WHERE user_id = ? AND status = "pending"', 
                        [data.id, userId]
                    );
                }
            }
        } catch (error) {
            console.error("Erro no Webhook:", error);
        }
    }
});

// --- ROTA 1: SOLICITAR RECUPERAÇÃO (VIA RESEND API - SEM BLOQUEIO) ---
// Substituiu o Nodemailer para não dar erro de porta na Hostinger
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log("1. [Resend] Tentativa de reset para:", email); 

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'E-mail não encontrado.' });
        }

        const user = users[0];
        const secret = process.env.JWT_SECRET + user.password_hash;
        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
        
        // CONFIRME O DOMÍNIO AQUI
        const link = `https://xn--prxyz-1ta.com/reset-password.html?id=${user.id}&token=${token}`;

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                <h2 style="color: #e50914; text-align: center;">PRÓXYZ</h2>
                <p>Olá, <strong>${user.name}</strong>.</p>
                <p>Clique abaixo para redefinir sua senha:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${link}" style="background-color: #e50914; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">REDEFINIR SENHA</a>
                </div>
            </div>
        `;

        console.log("4. Enviando via Resend API...");
        // Usa fetch nativo (funciona em qualquer Node recente)
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: 'Onboarding <onboarding@resend.dev>', 
                to: [email],
                subject: 'Redefinição de Senha',
                html: htmlContent
            })
        });

        const data = await response.json();

        if (response.ok) {
            res.json({ message: 'E-mail enviado com sucesso!' });
        } else {
            console.error("Erro Resend:", data);
            res.status(500).json({ error: 'Erro ao enviar e-mail (API).' });
        }

    } catch (error) {
        console.error("ERRO CRÍTICO:", error);
        res.status(500).json({ error: 'Erro interno.' });
    }
});

// --- ROTA 2: SALVAR NOVA SENHA ---
app.post('/api/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (users.length === 0) return res.status(404).json({ error: 'Usuário não existe.' });
        
        const user = users[0];
        const secret = process.env.JWT_SECRET + user.password_hash;

        try {
            jwt.verify(token, secret);
        } catch (err) {
            return res.status(400).json({ error: 'Link inválido ou expirado.' });
        }

        const newHash = await bcrypt.hash(password, 10);
        await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, id]);

        res.json({ message: 'Senha alterada com sucesso!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao redefinir senha.' });
    }
});

// --- TABELA DE PREÇOS STRIPE ---
const PRICING_TABLE = {
    'BRL': { amount: 9797, currency: 'brl' },
    'USD': { amount: 1990, currency: 'usd' },
    'EUR': { amount: 1990, currency: 'eur' },
    'JPY': { amount: 3000, currency: 'jpy' },
    'GBP': { amount: 1490, currency: 'gbp' },
    'CAD': { amount: 2990, currency: 'cad' },
    'AUD': { amount: 2990, currency: 'aud' },
};

app.post('/api/create-stripe-session', async (req, res) => {
    const { userId, email, countryCode } = req.body;
    try {
        const selectedPrice = PRICING_TABLE[countryCode] || PRICING_TABLE['USD'];
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: selectedPrice.currency,
                    product_data: {
                        name: 'Acesso Próxyz Library',
                        description: 'Acesso vitalício à biblioteca de prompts.',
                    },
                    unit_amount: selectedPrice.amount,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `https://xn--prxyz-1ta.com/indexT1.html?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `https://xn--prxyz-1ta.com/api/stripe-cancel?userId=${userId}`,
            client_reference_id: userId.toString(),
            customer_email: email,
        });
        res.json({ url: session.url });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erro ao criar sessão Stripe' });
    }
});

app.get('/api/check-stripe-payment/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session.payment_status === 'paid') {
            const userId = session.client_reference_id;
            await pool.query('UPDATE users SET status = "active" WHERE id = ?', [userId]);
            await pool.query(
                'INSERT INTO sales (user_id, amount, status, transaction_id, pix_code) VALUES (?, 19.90, "paid", ?, "Stripe")',
                [userId, session.payment_intent]
            );
            return res.json({ status: 'paid', userId });
        }
        res.json({ status: 'pending' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erro ao verificar pagamento' });
    }
});

app.get('/api/stripe-cancel', async (req, res) => {
    res.redirect('/indexT1.html?payment=canceled');
});

// --- ROTA: LOG CÓPIA ---
app.post('/api/log-copy', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedUser) => {
        if (err) return res.sendStatus(403);
        const { promptId } = req.body;
        const userId = decodedUser.id;

        if (!promptId) return res.status(400).json({ error: 'Prompt ID necessário.' });
        try {
            await pool.query(
                'INSERT INTO prompt_logs (user_id, prompt_id) VALUES (?, ?)',
                [userId, promptId]
            );
            res.sendStatus(200);
        } catch (error) {
            console.error('Erro ao logar cópia:', error);
            res.sendStatus(500);
        }
    });
});

// --- ROTAS DE VÍDEO E ÁUDIO ---
app.get('/api/video-tutorial', (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(403).send('Token necessário');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
        if (err) return res.status(401).send('Token inválido');
        const videoPath = path.join(__dirname, 'videos_secretos', 'tut1', 'tut1.mp4');

        fs.stat(videoPath, (err, stats) => {
            if (err) {
                console.error("Erro arquivo vídeo:", err);
                return res.status(404).send('Vídeo não encontrado');
            }
            const range = req.headers.range;
            if (!range) {
                res.writeHead(200, {
                    'Content-Length': stats.size,
                    'Content-Type': 'video/mp4',
                });
                fs.createReadStream(videoPath).pipe(res);
                return;
            }
            const CHUNK_SIZE = 10 ** 6; 
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + CHUNK_SIZE, stats.size - 1);
            const contentLength = end - start + 1;
            const headers = {
                "Content-Range": `bytes ${start}-${end}/${stats.size}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "video/mp4",
            };
            res.writeHead(206, headers);
            fs.createReadStream(videoPath, { start, end }).pipe(res);
        });
    });
});

app.get('/api/audio-tutorial', (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(403).send('Token necessário');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Token inválido');
        const audioPath = path.join(__dirname, 'videos_secretos', 'Tut1', 'Tut1.MP3');

        fs.stat(audioPath, (err, stats) => {
            if (err) {
                console.error("Erro arquivo áudio:", err);
                return res.status(404).send('Áudio não encontrado');
            }
            const range = req.headers.range;
            if (!range) {
                res.writeHead(200, {
                    'Content-Length': stats.size,
                    'Content-Type': 'audio/mpeg',
                });
                fs.createReadStream(audioPath).pipe(res);
                return;
            }
            const CHUNK_SIZE = 10 ** 6; 
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + CHUNK_SIZE, stats.size - 1);
            const contentLength = end - start + 1;
            const headers = {
                "Content-Range": `bytes ${start}-${end}/${stats.size}`,
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                "Content-Type": "audio/mpeg",
            };
            res.writeHead(206, headers);
            fs.createReadStream(audioPath, { start, end }).pipe(res);
        });
    });
});

// --- INICIALIZAÇÃO ---
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`🔥 Server ON porta ${PORT}`));