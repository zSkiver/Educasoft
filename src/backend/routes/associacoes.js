const express = require("express");
const router = express.Router();
const controller = require("../controllers/associacaoController");

router.get("/", controller.getAll);
router.get("/inativas", controller.getInactive);
router.patch("/desativar", controller.deactivate);
router.patch("/reativar", controller.reactivate);
router.patch("/atualizar", controller.update);

module.exports = router;
