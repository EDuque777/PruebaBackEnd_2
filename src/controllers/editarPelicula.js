const { Personaje, Pelicula } = require("../db");

const editarPelicula = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, imagen, fechaCreacion, calificacion, personajeAsociado } = req.body;

        const pelicula = await Pelicula.findOne({ where: { id } });

        if (!pelicula) {
            return res.status(404).send("Pelicula no encontrada");
        }

        if (!titulo || !imagen || !fechaCreacion || !calificacion || !personajeAsociado) {
            return res.status(400).send("Faltan datos por completar");
        }

        const personaje = await Personaje.findAll({ where: { nombre: personajeAsociado} });

       
        const personajeEncontrado = personaje.map(personaje => personaje.nombre.toLowerCase());
        const personajeFaltantes = personajeAsociado.filter(personaje => !personajeEncontrado.includes(personaje.toLowerCase()));
        if (personajeFaltantes.length > 0) {
            return res.status(404).send(`No se encontro los personajes: ${personajeFaltantes.join(', ')}. ¡crea a los personajes para poder asociarlos a la pelicula!`);
        }

        const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!fechaRegex.test(fechaCreacion)) {
            return res.status(400).send("La fecha de creación debe estar en el formato día/mes/año");
        }

        if (calificacion < 1 || calificacion > 5) {
            return res.status(400).send("La calificación debe estar entre 1 y 5");
        }
        
        await pelicula.update({ titulo, imagen, fechaCreacion, calificacion, personajeAsociado: personajeAsociado.join(', ') });
        
        await pelicula.setPersonajes(personaje); 

        return res.status(200).json("Pelicula editada correctamente");

    } catch (error) {
        res.status(500).send(error.message);
    }
}


module.exports = {
    editarPelicula
};