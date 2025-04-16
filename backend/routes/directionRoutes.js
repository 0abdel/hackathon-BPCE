const express = require("express");
const router = express.Router();
const directionController = require("../controllers/directionControllers");

router.get("/", directionController.getAllDirection);
router.get("/:name", directionController.getDirectionByName);

module.exports = router;