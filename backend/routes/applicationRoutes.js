const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationControllers");

router.get("/", applicationController.getAllApplication);
router.get("/:name", (req, res, next) => {
    console.log("🔍 Requête reçue pour :", req.params.name);
    next();
}, applicationController.getApplicationByName);

module.exports = router;