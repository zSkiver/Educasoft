const Aluno = require('../models/aluno');
const Turma = require('../models/turmaModel');

exports.getAssociacoes = async (req, res) => {
  try {
    const alunos = await Aluno.findAll({
      where: { ativo: true },
      include: [{
        model: Turma,
        as: 'turmas',
        through: { attributes: [] },
        attributes: ['nome', 'semestre_ano', 'dia_semana', 'horario', 'horario_termino']
      }]
    });

    const resultado = alunos.map(aluno => ({
      matricula: aluno.matricula,
      nome: aluno.nome,
      turmas: aluno.turmas || []
    }));

    res.json(resultado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar associações', error: err.message });
  }
};


