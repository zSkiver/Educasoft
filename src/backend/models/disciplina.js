
const { DataTypes } = require('sequelize');
const sequelize = require('../conexao');

const Disciplina = sequelize.define('Disciplina', {
  idDisciplina: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(90),
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  codigo: {
    type: DataTypes.STRING(10),
    defaultValue: true,
  },
  periodo: {
    type: DataTypes.STRING(10),
    defaultValue: true,
  }
}, {
  tableName: 'disciplina',
  timestamps: false,
});

module.exports = Disciplina;
