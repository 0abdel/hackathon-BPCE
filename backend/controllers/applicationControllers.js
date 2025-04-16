const pool = require("../db");

exports.getAllApplication = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM application");
        res.json(result.rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des application :", error);
        res.status(500).send("Erreur serveur");
    }
};

exports.getApplicationByName = async (req, res) => {
    const applicationName = req.params.name; 

    console.log("🔍 Recherche d'application pour :", applicationName);

    try {
        const query = "SELECT * FROM application WHERE application ILIKE $1 || '%' LIMIT 10";
        console.log("📌 Requête SQL :", query);

        const result = await pool.query(query, [applicationName]);

        console.log("✅ Résultat SQL :", result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Aucune application trouvée avec ce préfixe" });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("❌ Erreur SQL :", error.message);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
