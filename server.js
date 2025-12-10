const express = require('express');
const cors = require('cors');
const pool = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// --- ROTAS DE AUTENTICAÇÃO (MySQL Version) ---

// 1. CADASTRO
app.post('/api/register', async (req, res) => {
    const { name, email, whatsapp, password } = req.body;

    try {
        // Verifica se já existe (MySQL usa '?' e retorna um array [rows])
        const [userCheck] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (userCheck.length > 0) {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }

        // Criptografia
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt);

        // Salva no Banco
        const [result] = await pool.query(
            'INSERT INTO users (name, email, whatsapp, password_hash) VALUES (?, ?, ?, ?)',
            [name, email, whatsapp, hashPass]
        );

        res.json({ message: 'Usuário criado!', userId: result.insertId });

    } catch (err) {
        console.error("ERRO NO CADASTRO:", err); // Isso vai mostrar o erro real no seu terminal
        res.status(500).json({ error: 'Erro no servidor ao cadastrar.' });
    }
});

// 2. LOGIN
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca usuário
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        
        if (users.length === 0) {
            return res.status(400).json({ error: 'Usuário não encontrado.' });
        }

        const user = users[0];

        // Confere senha
        const validPass = await bcrypt.compare(password, user.password_hash);
        if (!validPass) {
            return res.status(400).json({ error: 'Senha incorreta.' });
        }

        // Gera Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({ 
            message: 'Logado com sucesso!',
            token: token,
            user: { name: user.name, email: user.email }
        });

    } catch (err) {
        console.error("ERRO NO LOGIN:", err); // Importante para debug
        res.status(500).json({ error: 'Erro no servidor ao logar.' });
    }
});

// 3. LISTAR PROMPTS
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
});