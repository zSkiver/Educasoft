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

Aluno.belongsToMany(require('./turmaModel'), {
  through: 'turma_has_aluno',
  foreignKey: 'matricula',
  otherKey: 'idTurma',
  as: 'turmas'
});