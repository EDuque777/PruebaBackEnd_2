const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Personaje', {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    imagen: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    edad: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    peso: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },

    historia: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    peliculaAsociada: {
        type: DataTypes.STRING,
        allowNull: false
    }
  },
  {
    paranoid: true
  });
};