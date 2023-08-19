const {Personaje, Pelicula}= require("../db");

const detallesPelicula = async (req, res) => {

    try {

        const { id } = req.params;

        const dbPelicula = await Pelicula.findByPk(id, {
            attributes: ['titulo', 'imagen', 'fechaCreacion', 'calificacion'],
            include: {
                model: Personaje,
                attributes: ["nombre"],
                through: { attributes: [] },
            },
        });

        if (!dbPelicula) {
            return res.status(404).send(`No se encontró ninguna pelicula con el ID: ${id}`);
        }
        
        return res.status(200).json(dbPelicula);

    } catch (error) {
        
        res.status(404).send(error.message)

    }

}



module.exports = {
    detallesPelicula
}