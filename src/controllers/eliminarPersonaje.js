const { Personaje } = require("../db");

const eliminarPersonaje = async (req, res) => {

    try {
        const { id } = req.params;

        const personaje = await Personaje.findByPk(id);

        if (!personaje) {
            return res.status(404).send("Personaje no encontrado");
        }

        await personaje.destroy();

        return res.status(200).json("Personaje eliminado correctamente");

    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    eliminarPersonaje
};
