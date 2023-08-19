const authLogout = (req, res, next) => {

    req.session.destroy(err => {
        if (err) {
            return res.send("hubo un error")
        }
        res.cookie("token", "", {
            expires : new Date(0)
        })
        res.send("sesion cerrada")
    })

}

module.exports = {
    authLogout
}