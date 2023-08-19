const { Usuario } = require("../db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { createAccessToken } = require("../middlewares/jwt.js")

const authLogin = async (req, res) => {
    try {

        const {emailLogin, passwordLogin} = req.body

        if (!emailLogin || !passwordLogin) {

            return res.status(400).send("Email y/o password incorrectos!!")
            
        } else {

            const existingUser = await Usuario.findOne({
                where : {
                    email : emailLogin
                }
            })
            console.log("QQQQQQ", existingUser );
            
            if (!existingUser) {
                
                res.status(400).send("El usuario no existe!!!")
            }else{

                const comparePassword = await bcrypt.compare(passwordLogin, existingUser.password)

                if (!comparePassword) {
                    
                    res.status(401).send("Contraseña Invalida")

                } else {

                    const token = await createAccessToken({id : existingUser.id})
                    
                    const login = res.status(200).send("Sesion Iniciada")
                }
            }
        }

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = {
    authLogin
}