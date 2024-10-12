const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Asignacion = sequelize.define('Asignacion', {
  id: {
    type: DataTypes.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  ficha: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  dia: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: ''
  },
  jornada: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: ''
  },
  instructor: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: ''
  },
  inicio: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fin: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'asignacion',
  timestamps: false
});

module.exports = Asignacion;
