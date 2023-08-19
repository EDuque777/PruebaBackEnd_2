const {Personaje, Pelicula}= require("../db");
const Sequelize = require('sequelize');

const buscarPersonajeNombre = async (req, res) => {
    try {
        const { name } = req.query;

        const dbPersonaje = await Personaje.findAll({
            attributes: ['nombre', 'imagen', 'edad', 'peso', 'historia', 'peliculaAsociada'],
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('nombre')),
                'LIKE',
                `%${name.toLowerCase()}%`
            ),
        });

        if (dbPersonaje.length === 0) {
            return res.status(400).send(`No hay personaje con el nombre: ${name}`);
        }

        const personajesConPesoDecimal = dbPersonaje.map(personaje => ({
            ...personaje.dataValues,
            peso: parseFloat(personaje.peso)
        }));

        return res.status(200).json(personajesConPesoDecimal);

    } catch (error) {
        res.status(404).send(error.message);
    }
};



const buscarPersonajeEdad = async (req, res) => {
    try {
        const { age } = req.query;

        const dbPersonaje = await Personaje.findAll({
            attributes: ['nombre', 'imagen', 'edad', 'peso', 'historia', 'peliculaAsociada'],
            where: {
                edad: age
            }
        });

        if (dbPersonaje.length === 0) {
            return res.status(400).send(`No hay personajes con la edad: ${age}`);
        }

        const personajesConPesoDecimal = dbPersonaje.map(personaje => ({
            ...personaje.dataValues,
            peso: parseFloat(personaje.peso)
        }));

        return res.status(200).json(personajesConPesoDecimal);

    } catch (error) {
        res.status(404).send(error.message);
    }
};



const buscarPersonajePeso = async (req, res) => {
    try {
        const { weight } = req.query;

        const dbPersonaje = await Personaje.findAll({
            attributes: ['nombre', 'imagen', 'edad', 'peso', 'historia', 'peliculaAsociada'],
            where: {
                peso: weight
            }
        });

        if (dbPersonaje.length === 0) {
            return res.status(400).send(`No hay personajes el peso: ${weight}`);
        }

        const personajesConPesoDecimal = dbPersonaje.map(personaje => ({
            ...personaje.dataValues,
            peso: parseFloat(personaje.peso)
        }));

        return res.status(200).json(personajesConPesoDecimal);

    } catch (error) {
        res.status(404).send(error.message);
    }
};



const buscarPersonajePelicula = async (req, res) => {
    try {

        const { idMovie } = req.query;

        const dbPersonaje = await Personaje.findAll({
            attributes: ['nombre', 'imagen', 'edad', 'peso', 'historia', 'peliculaAsociada'],
            include: { model: Pelicula, attributes: [], where: { id: idMovie } },
        });

        if (dbPersonaje.length === 0) {
            return res.status(400).send(`No hay Pelicula con el id: ${idMovie}`);
        }

        const personajesConPesoDecimal = dbPersonaje.map(personaje => ({
            ...personaje.dataValues,
            peso: parseFloat(personaje.peso)
        }));

        return res.status(200).json(personajesConPesoDecimal);

    } catch (error) {
        res.status(404).send(error.message);
    }
};



module.exports = {
    buscarPersonajeNombre,
    buscarPersonajeEdad,
    buscarPersonajePeso,
    buscarPersonajePelicula
}