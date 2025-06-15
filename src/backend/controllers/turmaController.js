const turmaModel = require("../models/turmaModel");
const Professor = require("../models/professor");
const Disciplina = require("../models/disciplina");
const Sala = require("../models/salaModel");
const TurmaHasAluno = require("../models/turmaHasAluno");

exports.getAll = async (req, res) => {
  try {
    const turmas = await turmaModel.findAll({
      where: { ativo: true },
      include: [
        { model: Professor, as: 'professor', attributes: ['nome'], required: false },
        { model: Disciplina, as: 'disciplina', attributes: ['nome'], required: false },
        { model: Sala, as: 'sala', attributes: ['nome', 'local'], required: false }
      ]
    });

    const turmasFormatadas = turmas.map(t => ({
      idTurma: t.idTurma,
      nome: t.nome,
      dia_semana: t.dia_semana,
      semestre_ano: t.semestre_ano,
      horario: t.horario,
      horario_termino: t.horario_termino,
      idProfessor: t.idProfessor,
      nomeProfessor: t.professor?.nome ?? "Não informado",
      idDisciplina: t.idDisciplina,
      nomeDisciplina: t.disciplina?.nome ?? "Não informado",
      idLocal: t.idLocal,
      nomeLocal: t.sala ? `${t.sala.nome} - ${t.sala.local ?? ""}` : "Não informado",
      ativo: t.ativo
    }));

    res.json(turmasFormatadas);
  } catch (error) {
    console.error("Erro em getAll:", error);
    res.status(500).json({ message: "Erro ao buscar turmas ativas", error: error.message });
  }
};

exports.getInactive = async (req, res) => {
  try {
    const turmas = await turmaModel.findAll({
      where: { ativo: false },
      include: [
        { model: Professor, as: 'professor', attributes: ['nome'], required: false },
        { model: Disciplina, as: 'disciplina', attributes: ['nome'], required: false },
        { model: Sala, as: 'sala', attributes: ['nome', 'local'], required: false }
      ]
    });

    const turmasFormatadas = turmas.map(t => ({
      idTurma: t.idTurma,
      nome: t.nome,
      dia_semana: t.dia_semana,
      semestre_ano: t.semestre_ano,
      horario: t.horario,
      horario_termino: t.horario_termino,
      idProfessor: t.idProfessor,
      nomeProfessor: t.professor?.nome ?? "Não informado",
      idDisciplina: t.idDisciplina,
      nomeDisciplina: t.disciplina?.nome ?? "Não informado",
      idLocal: t.idLocal,
      nomeLocal: t.sala ? `${t.sala.nome} - ${t.sala.local ?? ""}` : "Não informado",
      ativo: t.ativo
    }));

    res.json(turmasFormatadas);
  } catch (error) {
    console.error("Erro em getInactive:", error);
    res.status(500).json({ message: "Erro ao buscar turmas inativas", error: error.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const t = await turmaModel.findByPk(id, {
      include: [
        { model: Professor, as: 'professor', attributes: ['nome'], required: false },
        { model: Disciplina, as: 'disciplina', attributes: ['nome'], required: false },
        { model: Sala, as: 'sala', attributes: ['nome', 'local'], required: false }
      ]
    });

    if (t) {
      res.json({
        idTurma: t.idTurma,
        nome: t.nome,
        dia_semana: t.dia_semana,
        semestre_ano: t.semestre_ano,
        horario: t.horario,
        horario_termino: t.horario_termino,
        idProfessor: t.idProfessor,
        nomeProfessor: t.professor?.nome ?? "Não informado",
        idDisciplina: t.idDisciplina,
        nomeDisciplina: t.disciplina?.nome ?? "Não informado",
        idLocal: t.idLocal,
        nomeLocal: t.sala ? `${t.sala.nome} - ${t.sala.local ?? ""}` : "Não informado",
        ativo: t.ativo
      });
    } else {
      res.status(404).json({ message: "Turma não encontrada" });
    }
  } catch (error) {
    console.error("Erro em getById:", error);
    res.status(500).json({ message: "Erro ao buscar turma por ID", error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { nome, dia_semana, semestre_ano, horario, horario_termino, idProfessor, idDisciplina, idLocal } = req.body;

    if (!nome || !dia_semana || !semestre_ano || !horario || !horario_termino || !idProfessor || !idDisciplina || !idLocal) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const novaTurma = await turmaModel.create({
      nome, dia_semana, semestre_ano, horario, horario_termino, idProfessor, idDisciplina, idLocal
    });

    res.status(201).json({ message: "Turma criada com sucesso", id: novaTurma.idTurma });
  } catch (error) {
    console.error("Erro em create:", error);
    res.status(500).json({ message: "Erro ao criar turma", error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const { nome, dia_semana, semestre_ano, horario, horario_termino, idProfessor, idDisciplina, idLocal } = req.body;

    if (!nome || !dia_semana || !semestre_ano || !horario || !horario_termino || !idProfessor || !idDisciplina || !idLocal) {
      return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const [updated] = await turmaModel.update(
      { nome, dia_semana, semestre_ano, horario, horario_termino, idProfessor, idDisciplina, idLocal },
      { where: { idTurma: id } }
    );

    if (updated) {
      res.json({ message: "Turma atualizada com sucesso" });
    } else {
      res.status(404).json({ message: "Turma não encontrada" });
    }
  } catch (error) {
    console.error("Erro em update:", error);
    res.status(500).json({ message: "Erro ao atualizar turma", error: error.message });
  }
};

exports.deactivate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const [updated] = await turmaModel.update(
      { ativo: false },
      { where: { idTurma: id } }
    );

    if (updated) {
      res.json({ message: "Turma desativada com sucesso" });
    } else {
      res.status(404).json({ message: "Turma não encontrada" });
    }
  } catch (error) {
    console.error("Erro em deactivate:", error);
    res.status(500).json({ message: "Erro ao desativar turma", error: error.message });
  }
};

exports.reactivate = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const [updated] = await turmaModel.update(
      { ativo: true },
      { where: { idTurma: id } }
    );

    if (updated) {
      res.json({ message: "Turma reativada com sucesso" });
    } else {
      res.status(404).json({ message: "Turma não encontrada" });
    }
  } catch (error) {
    console.error("Erro em reactivate:", error);
    res.status(500).json({ message: "Erro ao reativar turma", error: error.message });
  }
};

exports.getAlunosDaTurma = async (req, res) => {
  try {
    const alunos = await require('../models/aluno').findAll({
      include: {
        model: require('../models/turmaModel'),
        where: { idTurma: req.params.id }
      }
    });
    res.json(alunos);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar alunos da turma", error: error.message });
  }
};

exports.associarAlunos = async (req, res) => {
  const idTurma = parseInt(req.params.id);
  const { idsAlunos } = req.body;

  try {
    for (const matricula of idsAlunos) {
      await TurmaHasAluno.findOrCreate({
        where: { idTurma, matricula }
      });
    }
    res.json({ message: "Alunos associados com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao associar alunos", error: err.message });
  }
};

exports.removerAluno = async (req, res) => {
  const idTurma = parseInt(req.params.id);
  const matricula = parseInt(req.params.matricula);

  try {
    await TurmaHasAluno.destroy({
      where: { idTurma, matricula }
    });
    res.json({ message: "Aluno removido com sucesso!" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao remover aluno", error: err.message });
  }
};
