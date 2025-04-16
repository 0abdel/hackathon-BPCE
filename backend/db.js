const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "./dbsmith.db");

const db = new sqlite3.Database(dbPath, err => {
    if (err) {
        console.error("❌ Erreur de connexion à SQLite :", err.message);
    } else {
        console.log("✅ Connecté à SQLite :", dbPath);
    }
});

module.exports = db;