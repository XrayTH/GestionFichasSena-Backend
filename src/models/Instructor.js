const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de ajustar la ruta al archivo de configuración de tu base de datos

const Instructor = sequelize.define('Instructor', {
  documento: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'NULL',
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'NULL',
  },
  telefono: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'NULL',
  },
  areaTematica: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  tableName: 'instructor',
  timestamps: false,
  charset: 'utf16',
  collate: 'utf16_spanish_ci',
});

module.exports = Instructor;
