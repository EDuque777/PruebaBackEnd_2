const { Usuario } = require("../db")
const transporter = require('../middlewares/nodemailer')
const bcrypt = require("bcryptjs")
const { createAccessToken } = require("../middlewares/jwt.js")


const authRegister = async (req, res) => {
    try {

        const { email, password, name, user_name, confirmPassword} = req.body

        if (!email || password.length < 8 || !password || !name || !user_name || user_name.length < 3 || user_name.length > 16) {
            
            res.status(400).send("datos invalidos")

        }else if (password !== confirmPassword) {

            res.status(400).send("Las contraseñas no coinciden");

        }else{

            const existUer = await Usuario.findOne({
                where : {
                    email : email
                }
            })

            if (existUer) {

                res.status(400).send("el usuario ya existe!!!")

            }else{

                const salt = await bcrypt.genSalt(12)

                const cripto = await bcrypt.hash(password, salt)
    
                const createUser = await Usuario.create({
                    name,
                    email,
                    password : cripto,
                    user_name,
                    confirmPassword,
                })
    
                const token = await createAccessToken({id : createUser.id})
    
                res.cookie("token", token)
                res.status(200).send("Usuario Creado Correctamente")
            }
        }

        
    await transporter.sendMail({
        from: '"Bienvenido a mi plataforma" <esteban.duque911@gmail.com>',
        to: `${email}`,
        subject: "Bienvenido a mi plataforma",
        html:  `<h1>Bienvenido al mundo de Disney</h1>
                ¡Hola ${name}!</p>
                <p>Te doy la bienvenida a esta plataforma.</p>
                <p>Aquí tendrás acceso a diversas funciones emocionantes, como la creación y edición de personajes y películas. También podrás explorar la lista de películas con sus respectivos personajes, y usar varias herramientas de búsqueda basadas en nombre, peso, edad de los personajes, así como datos de las películas.</p>
                <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarme a través del correo electrónico esteban.duque911@gmail.com.</p>
                <p>agradezco tu confianza en mi página web y espero que disfrutes de una experiencia memorable mientras creas recuerdos duraderos.</p>
                <p>Saludos...</p>
                <p>Atentamente,</p>
                <p>Esteban Duque Certuche</p>`
        }
    )

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


module.exports = {
    authRegister
}