const db = require("../db");

exports.getAllApplication = (req, res) => {
    db.all("SELECT * FROM application", (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération des applications :", err.message);
            return res.status(500).send("Erreur serveur");
        }

        res.json(rows);
    });
};

exports.getApplicationByName = (req, res) => {
    const applicationName = req.params.name;
    console.log("🔍 Recherche d'application pour :", applicationName);

    const query = `
        SELECT * FROM application 
        WHERE LOWER(application) LIKE LOWER(?) 
        LIMIT 10`;

    db.all(query, [applicationName + '%'], (err, rows) => {
        if (err) {
            console.error("❌ Erreur SQL :", err.message);
            return res.status(500).json({ message: "Erreur serveur", error: err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: "Aucune application trouvée avec ce préfixe" });
        }

        console.log("✅ Résultat SQL :", rows);
        res.json(rows);
    });
};