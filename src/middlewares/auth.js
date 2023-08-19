const jwt = require('jsonwebtoken');
require("dotenv").config()
const { JWT_SECRET } = process.env


const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token
    console.log(token);
    if (!token) {
        res.status(401).send("Debes iniciar sesion para utilizar esta ruta")
    } else {
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                res.status(403).send("Debes iniciar sesion para utilizar esta ruta")
            } else {
                req.user = user;
                next();
            }
        })
    }
}

module.exports = { isAuthenticated };