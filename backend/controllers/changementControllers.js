const db = require("../db");

exports.getAllChangements = (req, res) => {
    db.all("SELECT * FROM changements", (err, rows) => {
        if (err) {
            console.error("Erreur lors de la récupération des changements :", err.message);
            return res.status(500).send("Erreur serveur");
        }

        res.json(rows);
    });
};

exports.getChangementById = (req, res) => {
    const changementId = req.params.id;

    db.get("SELECT * FROM changements WHERE id = ?", [changementId], (err, row) => {
        if (err) {
            console.error("Erreur lors de la récupération du changement :", err.message);
            return res.status(500).send("Erreur serveur");
        }

        if (!row) {
            return res.status(404).json({ message: "Changement non trouvé" });
        }

        res.json(row);
    });
};