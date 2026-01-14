const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { MercadoPagoConfig, Payment } = require('mercadopago');
const path = require('path');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
require('dotenv').config();

// IMPORTA OS PROMPTS DO OUTRO ARQUIVO
const promptsData = require('./prompts');

// 1. CRIA O APP
const app = express();

// 2. CONFIGURAÇÕES
app.use(express.json());
app.use(cors());

// 3. SEGURANÇA: RATE LIMIT
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 10, 
    message: "Muitas tentativas de login. Tente novamente mais tarde."
});
app.use('/api/login', loginLimiter);

// 4. ARQUIVOS PÚBLICOS
app.use(express.static(path.join(__dirname, 'public')));

// 5. ROTA INICIAL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'indexT1.html'));
});

// --- MERCADO PAGO CONFIG ---
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN });

// --- ROTAS DA API ---

app.get('/api/config', (req, res) => {
    res.json({ publicKey: process.env.MP_PUBLIC_KEY });
});

app.post('/api/register', async (req, res) => {
    const { name, email, whatsapp, password } = req.body;
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        // 1. Se já existe e está ATIVO, bloqueia
        if (user.length > 0 && user[0].status === 'active') {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }

        // 2. Se existe e está PENDENTE, limpa TUDO para recriar
        if (user.length > 0 && user[0].status === 'pending') {
            try {
                // A ordem é importante! Primeiro logs, depois vendas, depois usuário.
                await pool.query('DELETE FROM prompt_logs WHERE user_id = ?', [user[0].id]); // <--- Faltava essa linha no seu arquivo!
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

app.post('/api/create-payment', async (req, res) => {
    const { userId, email, type, token, issuerId, paymentMethodId, payer } = req.body;
    
    try {

        console.log("--- DEBUG CHAVES ---");
        console.log("Token recebido do Front:", token ? token.substring(0, 5) + "..." : "SEM TOKEN");
        console.log("Meu Access Token (Backend):", process.env.MP_ACCESS_TOKEN ? process.env.MP_ACCESS_TOKEN.substring(0, 10) + "..." : "FALTA NO .ENV");

        const payment = new Payment(client);
        let body = {};
        
        // 1. DEFINA O VALOR AQUI (Para usar em tudo)
        const AMOUNT_BRL = 5.00;

        if (type === 'card') {
            body = {
                transaction_amount: AMOUNT_BRL, // Usa a constante
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
                transaction_amount: AMOUNT_BRL, // Usa a constante
                description: 'Acesso Próxyz Library',
                payment_method_id: 'pix',
                payer: { email: email },
                notification_url: process.env.WEBHOOK_URL
            };
        }

        const result = await payment.create({ body });
        const statusVenda = result.status === 'approved' ? 'paid' : 'pending';
        const pixInfo = type === 'pix' ? result.point_of_interaction.transaction_data.qr_code : 'CARD';

        // 2. CORREÇÃO NO BANCO DE DADOS
        // Note que troquei o '19.90' por '?' e adicionei o AMOUNT_BRL na lista de valores
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

// --- NOVA ROTA: PROCESSAR PAGAMENTO VIA BRICK (CARTÃO/DÉBITO) ---
app.post('/api/process-brick', async (req, res) => {
    const { formData, userId, email } = req.body;
    
    try {
        const payment = new Payment(client);
        
        // Dados do pagamento
        const body = {
            ...formData, // Pega o token e dados que o Brick mandou
            transaction_amount: 5.00, // <--- VALOR FIXO DE SEGURANÇA (R$ 1,00)
            description: 'Acesso Próxyz Library',
            payer: {
                email: email,
                ...formData.payer
            },
            notification_url: process.env.WEBHOOK_URL
        };

        // Cria a cobrança no Mercado Pago
        const result = await payment.create({ body });
        
        // Define status para salvar no banco
        const statusVenda = result.status === 'approved' ? 'paid' : 'pending';
        
        // Salva na tabela sales
        await pool.query(
            'INSERT INTO sales (user_id, amount, status, transaction_id, pix_code) VALUES (?, ?, ?, ?, ?)',
            [userId, 1.00, statusVenda, result.id, 'BrickCard']
        );

        // Se aprovou, ativa o usuário
        if (result.status === 'approved') {
            await pool.query('UPDATE users SET status = "active" WHERE id = ?', [userId]);
            return res.json({ status: 'approved' });
        }

        // Retorna o status (pode ser 'in_process', 'rejected', etc)
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

// --- ROTA DE PROMPTS (MODIFICADA) ---
app.get('/api/prompts', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) return res.sendStatus(403);
        
        try {
            // AGORA SÓ DEVOLVEMOS O ARQUIVO IMPORTADO
            // O código fica limpo e fácil de ler
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
                await pool.query('UPDATE sales SET status = "paid" WHERE transaction_id = ?', [data.id]);
                const [sale] = await pool.query('SELECT user_id FROM sales WHERE transaction_id = ?', [data.id]);
                if (sale.length) await pool.query('UPDATE users SET status = "active" WHERE id = ?', [sale[0].user_id]);
            }
        } catch(e) {}
    }
});

// --- CONFIGURAÇÃO DE E-MAIL (NODEMAILER) ---
// --- NO ARQUIVO server.js (Substitua a configuração atual do transporter) ---
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Força o host explícito
    port: 587,              // Porta 587 é melhor aceita no Render que a 465
    secure: false,          // false para porta 587 (usa STARTTLS)
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Ajuda a evitar erros de certificado em alguns servidores
    }
});

// --- ROTA 1: SOLICITAR RECUPERAÇÃO (Envia o E-mail) ---
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;
    
    try {
        // 1. Verifica se usuário existe
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(404).json({ error: 'E-mail não encontrado.' });
        }

        const user = users[0];

        // 2. Gera um Token Temporário (válido por 1 hora)
        // Usamos o segredo do JWT + a senha atual do usuário (se ele mudar a senha, o token invalida)
        const secret = process.env.JWT_SECRET + user.password_hash;
        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

        // 3. Cria o Link de Recuperação
        const link = `https://xn--prxyz-1ta.com/reset-password.html?id=${user.id}&token=${token}`;

        // 4. Envia o E-mail
        const mailOptions = {
            from: '"Suporte Próxyz" <seu_email_proxyz@gmail.com>',
            to: email,
            subject: 'Redefinição de Senha - PRÓXYZ',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
                    <h2 style="color: #e50914; text-align: center;">PRÓXYZ</h2>
                    <p>Olá, <strong>${user.name}</strong>.</p>
                    <p>Recebemos uma solicitação para redefinir sua senha.</p>
                    <p>Clique no botão abaixo para criar uma nova senha:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${link}" style="background-color: #e50914; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">REDEFINIR MINHA SENHA</a>
                    </div>
                    <p style="font-size: 12px; color: #777;">Se você não solicitou isso, ignore este e-mail. O link expira em 1 hora.</p>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: 'E-mail enviado com sucesso!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao enviar e-mail.' });
    }
});

// --- ROTA 2: SALVAR NOVA SENHA ---
app.post('/api/reset-password/:id/:token', async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;

    try {
        // 1. Busca o usuário para pegar a hash antiga (necessária para validar o token)
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        if (users.length === 0) return res.status(404).json({ error: 'Usuário não existe.' });
        
        const user = users[0];
        const secret = process.env.JWT_SECRET + user.password_hash;

        // 2. Verifica se o Token é válido
        try {
            jwt.verify(token, secret);
        } catch (err) {
            return res.status(400).json({ error: 'Link inválido ou expirado.' });
        }

        // 3. Hash da nova senha e atualização no banco
        const newHash = await bcrypt.hash(password, 10);
        await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, id]);

        res.json({ message: 'Senha alterada com sucesso!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao redefinir senha.' });
    }
});

// --- TABELA DE PREÇOS (Hardcoded) ---
const PRICING_TABLE = {
    'BRL': { amount: 9797, currency: 'brl' }, // R$ 97,97
    'USD': { amount: 1990, currency: 'usd' }, // $ 19.90
    'EUR': { amount: 1990, currency: 'eur' }, // € 19.90
    'JPY': { amount: 3000, currency: 'jpy' }, // ¥ 3000 (Sem centavos)
    'GBP': { amount: 1490, currency: 'gbp' }, // £ 14.90
    'CAD': { amount: 2990, currency: 'cad' }, // C$ 29.90
    'AUD': { amount: 2990, currency: 'aud' }, // A$ 29.90
};

app.post('/api/create-stripe-session', async (req, res) => {
    const { userId, email, countryCode } = req.body; // Recebemos o countryCode do front

    try {
        // 1. Define a moeda (Se não tiver na lista, usa USD como padrão internacional)
        // Você pode mudar o 'fallback' para 'BRL' se preferir.
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

// --- ROTA: VERIFICA PAGAMENTO (QUANDO O USUÁRIO VOLTA) ---
app.get('/api/check-stripe-payment/:sessionId', async (req, res) => {
    const { sessionId } = req.params;
    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        
        if (session.payment_status === 'paid') {
            const userId = session.client_reference_id;
            
            // Atualiza o banco de dados
            await pool.query('UPDATE users SET status = "active" WHERE id = ?', [userId]);
            
            // Registra a venda (opcional, mas bom para histórico)
            await pool.query(
                'INSERT INTO sales (user_id, amount, status, transaction_id, pix_code) VALUES (?, 19.90, "paid", ?, "Stripe")',
                [userId, session.payment_intent] // payment_intent é o ID da transação
            );

            return res.json({ status: 'paid', userId });
        }
        
        res.json({ status: 'pending' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Erro ao verificar pagamento' });
    }
});

// --- ROTA: CANCELAMENTO DO STRIPE ---
// Esta rota é chamada quando o usuário clica em "voltar" na página do Stripe
app.get('/api/stripe-cancel', async (req, res) => {
    const { userId } = req.query;

    if (userId) {
        try {
            // 1. Verifica se o usuário existe e se está 'pending' (Segurança para não apagar usuários ativos)
            const [user] = await pool.query('SELECT status FROM users WHERE id = ?', [userId]);
            
            if (user.length > 0 && user[0].status === 'pending') {
                // 2. Deleta vendas e usuário
                await pool.query('DELETE FROM sales WHERE user_id = ?', [userId]);
                await pool.query('DELETE FROM users WHERE id = ?', [userId]);
                console.log(`Usuário ${userId} deletado após cancelamento no Stripe.`);
            }
        } catch (err) {
            console.error("Erro ao limpar usuário do Stripe:", err);
        }
    }

    // 3. Redireciona o usuário de volta para a tela inicial
    res.redirect('/indexT1.html?payment=canceled');
});

// --- ROTA: REGISTRAR CÓPIA DE PROMPT (A CAIXA PRETA) ---
app.post('/api/log-copy', async (req, res) => {
    // 1. Verifica Autenticação (Igual à rota de prompts)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedUser) => {
        if (err) return res.sendStatus(403);

        // 2. Recebe o ID do prompt que foi copiado
        const { promptId } = req.body;
        const userId = decodedUser.id; // Pega o ID do usuário direto do token (seguro)

        if (!promptId) return res.status(400).json({ error: 'Prompt ID necessário.' });

        try {
            // 3. Grava no banco de dados (A prova jurídica)
            await pool.query(
                'INSERT INTO prompt_logs (user_id, prompt_id) VALUES (?, ?)',
                [userId, promptId]
            );
            
            // Retorna OK (200) sem mostrar nada pro usuário
            res.sendStatus(200);
            
        } catch (error) {
            console.error('Erro ao logar cópia:', error);
            // Mesmo se der erro no log, não travamos o usuário, apenas logamos o erro no console
            res.sendStatus(500);
        }
    });
});

// --- ROTA DE VÍDEO SEGURO (COM STREAMING) ---
const fs = require('fs'); // Mantenha apenas este require aqui

app.get('/api/video-tutorial', (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(403).send('Token necessário');

    // Use process.env.JWT_SECRET para garantir que é a mesma chave do login
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
        if (err) return res.status(401).send('Token inválido');

        // CORREÇÃO AQUI: Adicionamos 'Tut1' no caminho
        const videoPath = path.join(__dirname, 'videos_secretos', 'tut1', 'tut1.mp4');

        fs.stat(videoPath, (err, stats) => {
            if (err) {
                console.error("Erro arquivo vídeo:", err); // Ajuda a ver o erro no terminal
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
            const videoStream = fs.createReadStream(videoPath, { start, end });
            videoStream.pipe(res);
        });
    });
});

app.get('/api/audio-tutorial', (req, res) => {
    const token = req.query.token;
    if (!token) return res.status(403).send('Token necessário');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send('Token inválido');

        // CORREÇÃO AQUI: Adicionamos 'Tut1' no caminho
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
            const audioStream = fs.createReadStream(audioPath, { start, end });
            audioStream.pipe(res);
        });
    });
});

// A Hostinger vai preencher o process.env.PORT automaticamente
const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => console.log(`🔥 Server ON porta ${PORT}`));