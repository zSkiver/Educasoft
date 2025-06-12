const { DataTypes } = require('sequelize');
const sequelize = require('../conexao');

const TurmaHasAluno = sequelize.define('TurmaHasAluno', {
  idTurma: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  matricula: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: 'turma_has_aluno',
  timestamps: false
});

module.exports = TurmaHasAluno;
