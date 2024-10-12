const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Programa = sequelize.define('Programa', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: '0',
  },
  nombreCorto: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: '0',
  },
}, {
  tableName: 'programa',
  timestamps: false, // Si no quieres que Sequelize maneje los campos `createdAt` y `updatedAt`
  charset: 'utf16',
  collate: 'utf16_spanish_ci',
});

module.exports = Programa;
