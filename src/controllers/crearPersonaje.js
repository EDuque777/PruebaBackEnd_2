const { Personaje, Pelicula } = require("../db");

const crearPersonaje = async (req, res) => {
    try {
        const { nombre, imagen, edad, peso, historia, peliculaAsociada } = req.body;

        if (!nombre || !imagen || !edad || !peso || !historia || !peliculaAsociada || peliculaAsociada.length === 0) {
            return res.status(400).send("Faltan datos por completar");
        }

        const existePersonaje = await Personaje.findOne({ where: { nombre } });
        if (existePersonaje) {
            return res.status(400).send(`Ya existe el personaje con el nombre de: ${nombre}`);
        }

        const peliculas = await Pelicula.findAll({ where: { titulo: peliculaAsociada } });
        if (peliculas.length !== peliculaAsociada.length) {
            const peliculasEncontradas = peliculas.map(pelicula => pelicula.titulo.toLowerCase());
            const peliculasFaltantes = peliculaAsociada.filter(pelicula => !peliculasEncontradas.includes(pelicula.toLowerCase())); 
            return res.status(404).send(`No se encontraron las películas: ${peliculasFaltantes.join(', ')}. ¡crea las peliculas para poder asociar al personaje!`);
        }

        const nuevoPersonaje = await Personaje.create({
            nombre,
            imagen,
            edad,
            peso,
            historia,
            peliculaAsociada: peliculaAsociada.join(', ')
        });

        await nuevoPersonaje.setPeliculas(peliculas);

        return res.status(201).json("Personaje creado correctamente");

    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    crearPersonaje
};