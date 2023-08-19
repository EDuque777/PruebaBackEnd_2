const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  
  sequelize.define('Pelicula', {

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

    titulo: {
      type: DataTypes.STRING,
      allowNull: false
    },

    fechaCreacion: {
      type: DataTypes.STRING,
      allowNull: false
    },

    calificacion: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    personajeAsociado: {
      type: DataTypes.STRING,
      allowNull: false
    },

  },
  {
    paranoid: true
  });
};