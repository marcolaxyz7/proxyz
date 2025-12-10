net stop MySQL80
cmd
net start MySQL80

--Ligar node no terminal
node server.js


USE próxyz_db;

-- A ordem importa por causa das chaves estrangeiras (Foreign Keys)
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS prompts;
DROP TABLE IF EXISTS users;

-- 1. Tabela de Usuáriosa
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    whatsapp VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    status ENUM('active', 'pending', 'banned') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Prompts
CREATE TABLE prompts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    content TEXT NOT NULL,
    is_premium BOOLEAN DEFAULT TRUE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabela de Vendas
CREATE TABLE sales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2) DEFAULT 19.90,
    status VARCHAR(20) DEFAULT 'pending',
    pix_code TEXT,
    transaction_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- 4. Tabela de Favoritos
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    prompt_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE,
    UNIQUE(user_id, prompt_id)
);


-- Criar um Usuário Admin Fictício
INSERT INTO users (name, email, whatsapp, password_hash, role, status) 
VALUES ('Marco Admin', 'admin@proxyz.com', '11999999999', 'senha_teste_123', 'admin', 'active');

-- Criar 3 Prompts de Exemplo
INSERT INTO prompts (title, category, content, description, is_premium) VALUES 
('Copy AIDA Vendas', 'Marketing', 'Atue como um copywriter sênior. Escreva um email usando a estrutura AIDA (Atenção, Interesse, Desejo, Ação) para vender [PRODUTO].', 'Framework clássico para emails de alta conversão.', TRUE),
('Refatorador SOLID', 'Dev / Code', 'Analise o seguinte código [LINGUAGEM] e sugira refatorações baseadas nos princípios SOLID: [CÓDIGO]', 'Limpeza e otimização de código legado.', TRUE),
('Gerador de Imagens Realistas', 'Design', 'Foto ultra-realista de [SUJEITO], iluminação cinematográfica, 8k, unreal engine 5 render --v 6.0', 'Prompt base para Midjourney V6.', TRUE);

-- Simular uma Venda Aprovada
INSERT INTO sales (user_id, amount, status, pix_code, transaction_id) 
VALUES (1, 19.90, 'paid', 'pix_copia_cola_teste_123', 'tx_banco_001');

-- Simular um Favorito
INSERT INTO favorites (user_id, prompt_id) VALUES (1, 1);


-- Ver todos os usuários
SELECT * FROM users;

-- Ver todos os prompts ativos
SELECT * FROM prompts WHERE active = TRUE;

-- Relatório: Ver quem comprou o que (JOIN)
SELECT users.name, sales.amount, sales.status 
FROM sales 
INNER JOIN users ON sales.user_id = users.id;

-- Ver Favoritos
SELECT * FROM favorites;