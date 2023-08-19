const {Personaje, Pelicula}= require("../db");

const detallesPersonaje = async (req, res) => {

    try {

        const { id } = req.params;

        const dbPersonaje = await Personaje.findByPk(id, {
            attributes: ["nombre", "imagen", "edad", "peso", "historia"],
            include: {
                model: Pelicula,
                attributes: ["titulo"],
                through: { attributes: [] },
            },
        });

        if (!dbPersonaje) {
            return res.status(404).send(`No se encontró ningún personaje con el ID: ${id}`);
        }

        const personajeConPesoDecimal = {
            ...dbPersonaje.dataValues,
            peso: parseFloat(dbPersonaje.peso)
        };
        
        return res.status(200).json(personajeConPesoDecimal);

    } catch (error) {
        
        res.status(404).send(error.message)

    }

}



module.exports = {
    detallesPersonaje
}