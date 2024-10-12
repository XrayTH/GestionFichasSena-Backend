const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de ajustar la ruta al archivo de configuración de tu base de datos

const Coordinador = sequelize.define('Coordinador', {
  documento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: '',
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: '',
  },
  telefono: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: '0',
  },
}, {
  tableName: 'coordinador',
  timestamps: false,
  charset: 'utf16',
  collate: 'utf16_spanish_ci',
});

module.exports = Coordinador;
