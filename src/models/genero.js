const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Genero', {

    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },

    imagen: {
      type: DataTypes.STRING,
      allowNull: true
    },

    peliculaAsociada: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
  },
  {
    paranoid: true
  });
};