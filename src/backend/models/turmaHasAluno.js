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
  },
  ativo: {
  type: DataTypes.BOOLEAN,
  defaultValue: true
}
}, {
  tableName: 'turma_has_aluno',
  timestamps: false
});

const Aluno = require('./aluno');
const Turma = require('./turmaModel');

TurmaHasAluno.belongsTo(Aluno, { foreignKey: 'matricula' });
TurmaHasAluno.belongsTo(Turma, { foreignKey: 'idTurma' });

module.exports = TurmaHasAluno;
