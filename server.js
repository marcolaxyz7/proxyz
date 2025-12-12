const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// --- CONFIGURAÇÕES ---
app.use(express.json());
app.use(cors());

// [NOVO] Esta linha libera o acesso aos arquivos HTML, CSS e JS da pasta
app.use(express.static('.')); 

// --- ROTAS DE AUTENTICAÇÃO ---

// 1. CADASTRO
app.post('/api/register', async (req, res) => {
    const { name, email, whatsapp, password } = req.body;

    try {
        const [userCheck] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (userCheck.length > 0) {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        const [result] = await pool.query(
            'INSERT INTO users (name, email, whatsapp, password_hash) VALUES (?, ?, ?, ?)',
            [name, email, whatsapp, hashPass]
        );

        res.json({ message: 'Usuário criado!', userId: result.insertId });

    } catch (err) {
        console.error("ERRO NO CADASTRO:", err);
        res.status(500).json({ error: 'Erro no servidor ao cadastrar.' });
    }
});

// 2. LOGIN
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(400).json({ error: 'Usuário não encontrado.' });
        }

        const user = users[0];

        const validPass = await bcrypt.compare(password, user.password_hash);
        if (!validPass) {
            return res.status(400).json({ error: 'Senha incorreta.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ 
            message: 'Logado com sucesso!',
            token: token,
            user: { name: user.name, email: user.email }
        });

    } catch (err) {
        console.error("ERRO NO LOGIN:", err);
        res.status(500).json({ error: 'Erro no servidor ao logar.' });
    }
});

// 3. ESQUECI A SENHA
app.post('/api/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

        if (users.length === 0) {
            return res.status(404).json({ error: 'E-mail não encontrado no sistema.' });
        }

        const user = users[0];
        const secret = process.env.JWT_SECRET + user.password_hash;
        const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '15m' });

        // Link para o arquivo HTML que agora será servido corretamente
        const resetLink = `http://localhost:3000/reset-password.html?id=${user.id}&token=${token}`;

        console.log("==================================================");
        console.log(`📧 E-MAIL DE RECUPERAÇÃO PARA: ${user.email}`);
        console.log(`🔗 LINK: ${resetLink}`);
        console.log("==================================================");

        res.json({ message: 'Link de recuperação enviado para o e-mail!' });

    } catch (err) {
        console.error("ERRO NO FORGOT:", err);
        res.status(500).json({ error: 'Erro ao processar recuperação.' });
    }
});

// 4. RESETAR A SENHA (Rota Final)
app.post('/api/reset-password', async (req, res) => {
    const { userId, token, newPassword } = req.body;

    try {
        const [users] = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

        if (users.length === 0) {
            return res.status(404).json({ error: 'Usuário inválido.' });
        }

        const user = users[0];
        const secret = process.env.JWT_SECRET + user.password_hash;

        try {
            jwt.verify(token, secret);
        } catch (err) {
            return res.status(400).json({ error: 'Link expirado ou inválido. Solicite novamente.' });
        }

        const salt = await bcrypt.genSalt(10);
        const newHash = await bcrypt.hash(newPassword, salt);

        await pool.query('UPDATE users SET password_hash = ? WHERE id = ?', [newHash, userId]);

        res.json({ message: 'Senha alterada com sucesso!' });

    } catch (err) {
        console.error("ERRO RESET PASS:", err);
        res.status(500).json({ error: 'Erro no servidor.' });
    }
});

// 5. LISTAR PROMPTS
app.get('/api/prompts', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM prompts WHERE active = TRUE');
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar prompts' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🔥 Servidor MySQL rodando na porta ${PORT}`);
    console.log(`🌍 Acesse o site em: http://localhost:${PORT}/index.html`);
});