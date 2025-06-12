const express = require("express");
const router = express.Router();
const salaController = require("../controllers/salaController");

router.get("/", salaController.getAll);
router.get("/inativos", salaController.getInactive);
router.get("/:id", salaController.getById);
router.post("/", salaController.create);
router.put("/:id", salaController.update);
router.delete("/:id", salaController.deactivate); 
router.patch("/:id/reativar", salaController.reactivate); 

module.exports = router;
