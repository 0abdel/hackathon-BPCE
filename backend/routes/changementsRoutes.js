const express = require("express");
const router = express.Router();
const changementController = require("../controllers/changementControllers");

router.get("/", changementController.getAllChangements);
router.get("/:id", changementController.getChangementById);
router.put("/:id", changementController.updateIndiceConfiance); 


module.exports = router;