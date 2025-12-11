const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST, // Pega do .env
    user: process.env.DB_USER, // Pega do .env
    password: process.env.DB_PASS, // Pega do .env
    database: process.env.DB_NAME, // Pega do .env
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();