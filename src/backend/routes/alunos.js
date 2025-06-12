const express = require("express");
const router = express.Router();
const controller = require("../controllers/alunoController");

router.get("/", controller.getAll);
router.get("/todas", controller.getAllWithInativos);
router.get("/inativos", controller.getInactive);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.deactivate);
router.patch("/:id/reativar", controller.reactivate);

module.exports = router;
