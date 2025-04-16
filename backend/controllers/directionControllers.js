const db = require("../db");

exports.getAllDirection = (req, res) => {
    db.all("SELECT * FROM direction", (err, rows) => {
        if (err) {
            console.error("❌ Erreur lors de la récupération des directions :", err.message);
            return res.status(500).send("Erreur serveur");
        }

        res.json(rows);
    });
};

exports.getDirectionByName = (req, res) => {
    const searchTerm = req.params.name;
    console.log("🔍 Recherche de direction contenant :", searchTerm);

    const query = `
        SELECT * FROM direction 
        WHERE LOWER(direction_complete) LIKE LOWER(?)`;

    db.all(query, [`%${searchTerm}%`], (err, rows) => {
        if (err) {
            console.error("❌ Erreur SQL :", err.message);
            return res.status(500).json({ message: "Erreur serveur", error: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: "Aucune direction trouvée contenant ce terme" });
        }

        console.log("✅ Résultat SQL :", rows);
        res.json(rows);
    });
};