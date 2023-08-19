const { Pelicula } = require("../db");

const eliminarPelicula = async (req, res) => {

    try {
        const { id } = req.params;

        const pelicula = await Pelicula.findByPk(id);

        if (!pelicula) {
            return res.status(404).send("Pelicula no encontrada");
        }

        await pelicula.destroy();

        return res.status(200).json("Pelicula eliminada correctamente");

    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    eliminarPelicula
};
