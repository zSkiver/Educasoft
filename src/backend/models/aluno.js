const { DataTypes } = require('sequelize');
const sequelize = require('../conexao');

const Aluno = sequelize.define('Aluno', {
    matricula: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    },
    nome: {
    type: DataTypes.STRING(90),
    allowNull: false,
    },
    cpf: {
    type: DataTypes.STRING(14),
    allowNull: false,
    },
    ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    }
}, {
  tableName: 'aluno',
  timestamps: false,
});

module.exports = Aluno;

const Turma = require('./turmaModel');

Aluno.belongsToMany(Turma, {
  through: {
    model: 'turma_has_aluno',
    scope: { ativo: true },
  },
  foreignKey: 'matricula',
  otherKey: 'idTurma',
  as: 'turmas'
});