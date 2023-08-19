const {Personaje}= require("../db");

const listadoPersonajes = async (req, res) => {

    try {
        
        const dbPersonajes = await Personaje.findAll({
            attributes: ['nombre', 'imagen'],
        })

        if(dbPersonajes.length === 0){
            return res.status(400).send("No hay Personajes en la base de datos")
        }
        
        return res.status(200).json(dbPersonajes);
        
    } catch (error) {
        
        res.status(404).send(error.message)

    }

}


module.exports = {
    listadoPersonajes
}