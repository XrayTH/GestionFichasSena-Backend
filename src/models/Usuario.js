const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de que esta ruta sea correcta

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  contraseña: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  rol: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  editar: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    allowNull: false
  },
  crear: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    allowNull: false
  },
  gestionarUsuarios: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
    allowNull: false
  }
}, {
  tableName: 'usuarios', // Nombre de la tabla
  timestamps: false // Cambia esto si estás usando timestamps
});

module.exports = Usuario;
