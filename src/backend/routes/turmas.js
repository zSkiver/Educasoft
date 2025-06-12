const express = require("express");
const router = express.Router();
const turmaController = require("../controllers/turmaController");

router.get("/", turmaController.getAll);
router.get("/inativos", turmaController.getInactive);
router.get("/:id", turmaController.getById);
router.post("/", turmaController.create);
router.put("/:id", turmaController.update);
router.delete("/:id", turmaController.deactivate); 
router.patch("/:id/reativar", turmaController.reactivate); 
router.get("/:id/alunos", turmaController.getAlunosDaTurma);
router.post("/:id/associar-alunos", turmaController.associarAlunos);
router.delete("/:id/remover-aluno/:matricula", turmaController.removerAluno);


module.exports = router;
