const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

const Ambiente = sequelize.define(
  'Ambiente',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null
    }
  },
  {
    tableName: 'ambiente',
    timestamps: false,
    charset: 'utf16',
    collate: 'utf16_spanish_ci'
  }
);

module.exports = Ambiente;
