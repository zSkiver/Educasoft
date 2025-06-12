const { DataTypes } = require('sequelize');
const sequelize = require('../conexao');

const Sala = sequelize.define('Sala', {
  idLocal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  local: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  capacidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'local',
  timestamps: false,
});

module.exports = Sala;



