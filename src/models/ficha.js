const { DataTypes } = require('sequelize');
const db = require('../config/db'); // Ajusta la importación según tu configuración

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
    allowNull: true, // Permite que sea nulo
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
    allowNull: true, // Permite que sea nulo
  },
  fin: {
    type: DataTypes.DATE,
    allowNull: true, // Permite que sea nulo
  },
  requerimientos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'ficha',
  timestamps: false, // Si no usas createdAt y updatedAt
});

module.exports = Ficha;
