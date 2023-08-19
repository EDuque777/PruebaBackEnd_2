const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');


const sequelize = new Sequelize('mundodedisney', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

const basename = path.basename(__filename);

const modelDefiners = [];



fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);


const { Personaje, Pelicula, Genero } = sequelize.models;

Personaje.belongsToMany(Pelicula, {through: "Personajes_Peliculas"} )
Pelicula.belongsToMany(Personaje, {through: "Personajes_Peliculas"} )

Personaje.belongsToMany(Genero, {through: "Personajes_Generos"} )
Genero.belongsToMany(Personaje, {through: "Personajes_Generos"} )

Pelicula.belongsToMany(Genero, {through: "Pelicula_Generos"} )
Genero.belongsToMany(Pelicula, {through: "Pelicula_Generos"} )


module.exports = {
  ...sequelize.models, 
  conn: sequelize,     
};