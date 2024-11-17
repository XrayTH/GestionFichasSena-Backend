const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

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
  tablas: {  
    type: DataTypes.TINYINT,
    defaultValue: 0,
    allowNull: false
  },
  verProgramacion: {  
    type: DataTypes.TINYINT,
    defaultValue: 0,
    allowNull: false
  },
  editProgramacion: {  
    type: DataTypes.STRING(50),
    defaultValue: "Ninguno",
    allowNull: false
  },
  email: {  
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
  tableName: 'usuarios', 
  timestamps: false 
});

module.exports = Usuario;
