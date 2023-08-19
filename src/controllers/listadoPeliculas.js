const {Pelicula}= require("../db");

const listadoPeliculas = async (req, res) => {

    try {
        
        const dbPeliculas = await Pelicula.findAll({
            attributes: ['titulo', 'imagen', 'fechaCreacion'],
        })

        if(dbPeliculas.length === 0){
            return res.status(400).send("No hay Peliculas en la base de datos")
        }
        
        return res.status(200).json(dbPeliculas);
        
    } catch (error) {
        
        res.status(404).send(error.message)

    }

}


module.exports = {
    listadoPeliculas
}