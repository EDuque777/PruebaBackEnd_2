// const { Pelicula, Genero } = require("../db");

// const crearPelicula = async (req, res) => {
//     try {
//         const { titulo, imagen, fechaCreacion, calificacion, personajeAsociado, genero, generoImagen } = req.body;

//         if (!titulo || !imagen || !fechaCreacion || !calificacion || !personajeAsociado || !genero) {
//             return res.status(400).send("Faltan datos por completar");
//         }

//         const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
//         if (!fechaRegex.test(fechaCreacion)) {
//             return res.status(400).send("La fecha de creación debe estar en el formato día/mes/año");
//         }

//         if (calificacion < 1 || calificacion > 5) {
//             return res.status(400).send("La calificación debe estar entre 1 y 5");
//         }

//         const existePelicula = await Pelicula.findOne({ where: { titulo } });
//         if (existePelicula) {
//             return res.status(400).send(`Ya existe la película con el título: ${titulo}`);
//         }

//         const generoNombreMin = genero.toLowerCase();
//         const existeGenero = await Genero.findOne({ where: { nombre: generoNombreMin } });

//         if (existeGenero) {
//             return res.status(400).send(`El género "${genero}" ya existe`);
//         }

//         const nuevaPelicula = await Pelicula.create({
//             titulo,
//             imagen,
//             fechaCreacion,
//             calificacion,
//             personajeAsociado: personajeAsociado.join(', ')
//         });

//         const nuevoGenero = await Genero.create({
//             nombre: genero,
//             imagen: generoImagen,
//             peliculaAsociada: nuevaPelicula.id
//         });

//         await nuevoGenero.setPeliculas(nuevaPelicula);

//         return res.status(201).json("Película creada correctamente");
    
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// };

// module.exports = {
//     crearPelicula
// };




const { Pelicula, Genero } = require("../db");
const Sequelize = require('sequelize');

const crearPelicula = async (req, res) => {
    try {
        const { titulo, imagen, fechaCreacion, calificacion, personajeAsociado, genero, generoImagen } = req.body;

        if (!titulo || !imagen || !fechaCreacion || !calificacion || !personajeAsociado || !genero) {
            return res.status(400).send("Faltan datos por completar");
        }

        const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!fechaRegex.test(fechaCreacion)) {
            return res.status(400).send("La fecha de creación debe estar en el formato día/mes/año");
        }

        if (calificacion < 1 || calificacion > 5) {
            return res.status(400).send("La calificación debe estar entre 1 y 5");
        }

        const existePelicula = await Pelicula.findOne({ where: { titulo } });
        if (existePelicula) {
            return res.status(400).send(`Ya existe la película con el título: ${titulo}`);
        }

        const generoNombreMin = genero.toLowerCase();
        let existeGenero = await Genero.findOne({ where: { nombre: generoNombreMin } });

        if (!existeGenero) {
            existeGenero = await Genero.findOne({
                where: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('nombre')), generoNombreMin)
            });
        }

        const nuevaPelicula = await Pelicula.create({
            titulo,
            imagen,
            fechaCreacion,
            calificacion,
            personajeAsociado: personajeAsociado.join(', ')
        });

            existeGenero = await Genero.create({
                nombre: genero,
                imagen: generoImagen,
                peliculaAsociada: nuevaPelicula.titulo
            });

        await existeGenero.setPeliculas(nuevaPelicula);

        return res.status(201).json("Película creada correctamente");
    
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    crearPelicula
};