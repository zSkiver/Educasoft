const Aluno = require('../models/aluno');
const Turma = require('../models/turmaModel');
const Professor = require('../models/professor');
const Disciplina = require('../models/disciplina');
const Sala = require('../models/salaModel');
const TurmaHasAluno = require('../models/turmaHasAluno');

// Listar associações ativas
exports.getAll = async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      where: { ativo: true },
      include: [{
        model: Turma,
        as: 'turmas',
        through: { attributes: [] },
        attributes: ['idTurma', 'nome', 'semestre_ano', 'dia_semana', 'horario', 'horario_termino'],
        include: [
          { model: Professor, attributes: ['nome'], as: 'professor' },
          { model: Disciplina, attributes: ['nome'], as: 'disciplina' },
          { model: Sala, attributes: ['nome'], as: 'sala' }
        ]
      }]
    });

    const resultado = alunos.map(aluno => ({
      matricula: aluno.matricula,
      nome: aluno.nome,
      turmas: aluno.turmas || []
    }));

    res.json(resultado);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar associações ativas", error: error.message });
  }
};

exports.getInactive = async (req, res) => {
  try {
    const associacoes = await TurmaHasAluno.findAll({
      where: { ativo: false },
      include: [
        {
          model: Aluno,
          attributes: ['matricula', 'nome'],
          required: true
        },
        {
          model: Turma,
          attributes: ['idTurma', 'nome', 'semestre_ano', 'dia_semana', 'horario', 'horario_termino'],
          required: true
        }
      ]
    });

    const resultado = associacoes.map((a) => ({
      matricula: a.matricula,
      nome: a.Aluno.nome,
      idTurma: a.idTurma,
      nomeTurma: a.Turma.nome,
      semestre_ano: a.Turma.semestre_ano,
      dia_semana: a.Turma.dia_semana,
      horario: a.Turma.horario,
      horario_termino: a.Turma.horario_termino
    }));

    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar associações inativas', error: err.message });
  }
};

// Desativar associação
exports.deactivate = async (req, res) => {
  try {
    const { matricula, idTurma } = req.body;
    if (!matricula || !idTurma) {
      return res.status(400).json({ message: "Campos matrícula e idTurma são obrigatórios" });
    }

    const [updated] = await TurmaHasAluno.update({ ativo: false }, { where: { matricula, idTurma } });

    if (updated) {
      res.json({ message: "Associação desativada com sucesso" });
    } else {
      res.status(404).json({ message: "Associação não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao desativar associação", error: error.message });
  }
};

// Reativar associação
exports.reactivate = async (req, res) => {
  try {
    const { matricula, idTurma } = req.body;
    if (!matricula || !idTurma) {
      return res.status(400).json({ message: "Campos matrícula e idTurma são obrigatórios" });
    }

    const [updated] = await TurmaHasAluno.update({ ativo: true }, { where: { matricula, idTurma } });

    if (updated) {
      res.json({ message: "Associação reativada com sucesso" });
    } else {
      res.status(404).json({ message: "Associação não encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao reativar associação", error: error.message });
  }
};

exports.update = async (req, res) => {
  const { matricula, idTurmaAntiga, idTurmaNova } = req.body;

  try {
    // Remove vínculo antigo
    await TurmaHasAluno.destroy({
      where: { idTurma: idTurmaAntiga, matricula }
    });

    // Cria novo vínculo
    await TurmaHasAluno.findOrCreate({
      where: { idTurma: idTurmaNova, matricula }
    });

    res.json({ message: "Associação atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar associação:", error);
    res.status(500).json({ message: "Erro ao atualizar associação", error: error.message });
  }
};


