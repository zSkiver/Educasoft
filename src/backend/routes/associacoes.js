const express = require("express");
const router = express.Router();
const controller = require("../controllers/associacaoController");

router.get("/", controller.getAssociacoes);

module.exports = router;
