const pool = require("../db");

exports.getAllChangements = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM changements");
        res.json(result.rows);
    } catch (error) {
        console.error("Erreur lors de la récupération des changements :", error);
        res.status(500).send("Erreur serveur");
    }
};

exports.getChangementById = async (req, res) => {
    const changementId = req.params.id;

    try {
        const result = await pool.query("SELECT * FROM changements WHERE id = $1", [changementId]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "changement non trouvée" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error("Erreur lors de la récupération du changement :", error);
        res.status(500).send("Erreur serveur");
    }
};
