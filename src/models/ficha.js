const { DataTypes } = require('sequelize');
const db = require('../config/db'); 
//const Asignacion = require('../models/asignacion');

const Ficha = db.define('ficha', {
  codigo: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    defaultValue: 0,
  },
  coordinador: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  programa: {
    type: DataTypes.STRING(50),
    allowNull: true, 
  },
  gestor: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  ambiente: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  municipio: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  ubicacionGPS: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  inicio: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  fin: {
    type: DataTypes.DATE,
    allowNull: true, 
  },
  requerimientos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'ficha',
  timestamps: false, 
});

//Ficha.hasMany(Asignacion, { foreignKey: 'ficha', as: 'asignaciones' });

module.exports = Ficha;
