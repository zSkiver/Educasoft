// src/backend/models/turmaModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../conexao');

const Turma = sequelize.define('Turma', {
  idTurma: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  dia_semana: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  semestre_ano: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  horario: {
    type: DataTypes.DATE,
    allowNull: false
  },
  horario_termino: {
    type: DataTypes.TIME,
    allowNull: false
  },
  idProfessor: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idDisciplina: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idLocal: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
  tableName: 'turma',
  timestamps: false
});

module.exports = Turma;

const Professor = require('./professor');
const Disciplina = require('./disciplina');
const Local = require('./salaModel');

Turma.belongsTo(Professor, { foreignKey: 'idProfessor' });
Turma.belongsTo(Disciplina, { foreignKey: 'idDisciplina' });
Turma.belongsTo(Local, { foreignKey: 'idLocal', as: 'Local' }); 

Turma.belongsToMany(require('./aluno'), {
  through: 'turma_has_aluno',
  foreignKey: 'idTurma',
  otherKey: 'matricula',
  as: 'alunos'
});