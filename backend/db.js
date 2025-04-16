require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(() => console.log("✅ Connecté à PostgreSQL"))
    .catch(err => console.error("❌ Erreur de connexion à PostgreSQL :", err));

module.exports = pool;