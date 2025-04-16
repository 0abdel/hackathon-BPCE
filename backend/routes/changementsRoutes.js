const express = require("express");
const router = express.Router();
const changementController = require("../controllers/changementControllers");

router.get("/", changementController.getAllChangements);
router.get("/:id", changementController.getChangementById);

module.exports = router;