const { Personaje, Pelicula } = require("../db");

const editarPersonaje = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, imagen, edad, peso, historia, peliculaAsociada } = req.body;

        const personaje = await Personaje.findOne({ where: { id } });

        if (!personaje) {
            return res.status(404).send("Personaje no encontrado");
        }

        if (!nombre || !imagen || !edad || !peso || !historia || !peliculaAsociada) {
            return res.status(400).send("Faltan datos por completar");
        }

        const peliculas = await Pelicula.findAll({ where: { titulo: peliculaAsociada } });

       
        const peliculasEncontradas = peliculas.map(pelicula => pelicula.titulo.toLowerCase());
        const peliculasFaltantes = peliculaAsociada.filter(pelicula => !peliculasEncontradas.includes(pelicula.toLowerCase()));
        if (peliculasFaltantes.length > 0) {
            return res.status(404).send(`No se encontraron las películas asociadas: ${peliculasFaltantes.join(', ')}`);
        }

        
        await personaje.update({ nombre, imagen, edad, peso, historia, peliculaAsociada: peliculaAsociada.join(', ') });

        
        await personaje.setPeliculas(peliculas); 

        return res.status(200).json("Personaje editado correctamente");

    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    editarPersonaje
};