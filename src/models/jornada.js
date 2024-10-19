const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

class Jornada extends Model {}

Jornada.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: 'jornada',
    tableName: 'jornada',
    timestamps: false, 
  }
);

module.exports = Jornada;
