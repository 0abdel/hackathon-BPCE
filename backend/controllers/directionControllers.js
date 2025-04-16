const pool = require("../db");

exports.getAllDirection = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM direction");
        res.json(result.rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des directions :", error);
        res.status(500).send("Erreur serveur");
    }
};

exports.getDirectionByName = async (req, res) => {
    const searchTerm = req.params.name; 

    console.log("🔍 Recherche de direction contenant :", searchTerm);

    try {
        const query = "SELECT * FROM direction WHERE direction_complete ILIKE '%' || $1 || '%'";
        console.log("📌 Requête SQL :", query);

        const result = await pool.query(query, [searchTerm]);

        console.log("✅ Résultat SQL :", result.rows);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Aucune direction trouvée contenant ce terme" });
        }

        res.json(result.rows);
    } catch (error) {
        console.error("❌ Erreur SQL :", error.message);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};
