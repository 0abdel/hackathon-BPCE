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
exports.updateIndiceConfiance = (req, res) => {
    const changementId = req.params.id;
    const { indice_confiance } = req.body;

    if (typeof indice_confiance !== "number" || indice_confiance < 0 || indice_confiance > 100) {
        return res.status(400).json({ message: "Indice de confiance invalide (doit être entre 0 et 100)" });
    }

    db.run(
        "UPDATE changements SET indice_confiance = ? WHERE id = ?",
        [indice_confiance, changementId],
        function (err) {
            if (err) {
                console.error("Erreur lors de la mise à jour de l'indice de confiance :", err.message);
                return res.status(500).send("Erreur serveur");
            }

            if (this.changes === 0) {
                return res.status(404).json({ message: "Changement non trouvé" });
            }

            res.status(200).json({
                message: "Indice de confiance mis à jour avec succès",
                id: changementId,
                indice_confiance: indice_confiance,
            });
        }
    );
};