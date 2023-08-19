const {Pelicula, Genero}= require("../db");
const Sequelize = require('sequelize');

const buscarPeliculaNombre = async (req, res) => {
    try {

        const { name } = req.query;

        const dbPelicula = await Pelicula.findAll({
            attributes: ['titulo', 'imagen', 'fechaCreacion', 'calificacion'],
            where: Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col('titulo')),
                'LIKE',
                `%${name.toLowerCase()}%`
            ),
        });

        if (dbPelicula.length === 0) {
            return res.status(400).send(`No hay Pelicula con el nombre: ${name}`);
        }

        return res.status(200).json(dbPelicula);

    } catch (error) {
        res.status(404).send(error.message);
    }
};



const buscarPeliculaGenero = async (req, res) => {
    try {

        const { idGenre } = req.query;

        const dbPelicula = await Pelicula.findAll({
            attributes: ['titulo', 'imagen', 'fechaCreacion', 'calificacion'],
            include: { model: Genero, attributes: ["nombre"], where: { id: idGenre },  through: { attributes: [] } },
        });   
        
        if (dbPelicula.length === 0) {
            return res.status(400).send(`No hay genero con el ID: ${idGenre}`);
        }

        return res.status(200).json(dbPelicula);

    } catch (error) {
        res.status(404).send(error.message);
    }
};



const buscarPeliculaOrden = async (req, res) => {
    try {

        const { order } = req.query;

        if (order !== 'ASC' && order !== 'DESC') {
            return res.status(400).send("El parámetro 'order' debe ser 'ASC' o 'DESC'.");
        }

        const peliculas = await Pelicula.findAll({
            attributes: ['titulo', 'imagen', 'fechaCreacion', 'calificacion'],
            include: { model: Genero, attributes: ["nombre"],  through: { attributes: [] } },
        });

        if (peliculas.length === 0) {
            return res.status(404).send("No se encontraron películas en la base de datos.");
        }

        const peliculasOrdenadas = peliculas.sort((a, b) => {
        const fechaA = a.fechaCreacion.split('/').reverse().join('');
        const fechaB = b.fechaCreacion.split('/').reverse().join('');

            if (order === 'ASC') {
                return fechaA.localeCompare(fechaB);
            } else {
                return fechaB.localeCompare(fechaA);
            }
        });

        res.status(200).json(peliculasOrdenadas);

    } catch (error) {
        res.status(404).send(error.message);
    }
};


module.exports = {
    buscarPeliculaNombre,
    buscarPeliculaGenero,
    buscarPeliculaOrden 
}