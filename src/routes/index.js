const { Router } = require('express');

const router = Router();
const {listadoPersonajes} = require("../controllers/listadoPersonajes")
const {crearPersonaje} = require("../controllers/crearPersonaje")
const {editarPersonaje} = require("../controllers/editarPersonaje")
const {eliminarPersonaje} = require("../controllers/eliminarPersonaje")
const {detallesPersonaje} = require("../controllers/detallesPersonaje")
const {buscarPersonajeNombre, buscarPersonajeEdad, buscarPersonajePeso, buscarPersonajePelicula} = require("../controllers/busquedaPersonaje")
const {listadoPeliculas} = require("../controllers/listadoPeliculas")
const {crearPelicula} = require("../controllers/crearPelicula")
const {detallesPelicula} = require("../controllers/detallePeliculas")
const {editarPelicula} = require("../controllers/editarPelicula")
const {eliminarPelicula} = require("../controllers/eliminarPelicula")
const {buscarPeliculaNombre, buscarPeliculaGenero, buscarPeliculaOrden} = require("../controllers/busquedaPelicula")
const {authRegister} = require("../controllers/authRegister")
const {authLogin} = require("../controllers/authLogin")
const {authLogout} = require("../controllers/authLogout")
const {isAuthenticated} = require("../middlewares/auth")


/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Si ya tienes cuenta registrada, ¡inicia sesion!.
 *     tags:
 *       - Iniciar Sesion
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Iniciar Sesion'
 *     responses:
 *       200:
 *         description: Te has registrado correctamente.
*/


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Si no tienes cuenta registrada, ¡Registrate! (Una vez registrado no es necesario iniciar sesion, te llegara un mensaje de registro exitoso al correo).
 *     tags:
 *       - Registrate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Registrar Usuario'
 *     responses:
 *       200:
 *         description: Te has registrado correctamente.
*/


/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Crear una nueva película.
 *     tags:
 *       - Creación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Crear Pelicula'
 *     responses:
 *       200:
 *         description: Película creada correctamente.
 * 
 * @swagger
 * /characters:
 *   post:
 *     summary: Crear un nuevo Personaje.
 *     tags:
 *       - Creación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Crear Personaje'
 *     responses:
 *       200:
 *         description: Personaje creado correctamente.
*/


/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Obtiene una lista de todos los personajes con su nombre e imagen.
 *     tags:
 *       - Listas
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una lista de personajes.
 * 
 * @swagger
 * /movies:
 *   get:
 *     summary: Obtiene una lista de todas las películas con su título, imagen y fecha de creación.
 *     tags:
 *       - Listas
 *     responses:
 *       200:
 *         description: Respuesta exitosa. Devuelve una lista de películas.
*/


/**
 * @swagger
 * /moviesDetail/{id}:
 *   get:
 *     summary: Detalle de la película por ID.
 *     tags:
 *       - Detalles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number  
 *         description: ID de la película (si quieres ver el detalle de la primera película pon "1", si creaste dos películas y quieres ver el detalle de la segunda pon "2". ¡Sin las comillas, solo el número!).
 *     responses:
 *       200:
 *         description: Detalle de la película.
 * 
 * @swagger
 * /charactersDetail/{id}:
 *   get:
 *     summary: Detalle del personaje por ID.
 *     tags:
 *       - Detalles
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number  
 *         description: ID del personaje (si quieres ver el detalle del primer personaje pon "1", si creaste dos personajes y quieres ver el detalle del segundo pon "2". ¡Sin las comillas, solo el número!).
 *     responses:
 *       200:
 *         description: Detalle del personaje.
*/


/**
 * @swagger
 * /moviesName:
 *   get:
 *     summary: Buscar Película por nombre.
 *     tags:
 *       - Búsqueda y orden de películas
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string  
 *         description: Escribe el nombre de la película.
 *     responses:
 *       200:
 *         description: Película encontrada.
 * 
 * @swagger
 * /moviesIdGenre:
 *   get:
 *     summary: Buscar película por ID de género.
 *     tags:
 *       - Búsqueda y orden de películas
 *     parameters:
 *       - in: query
 *         name: idGenre
 *         required: true
 *         schema:
 *           type: number  
 *         description: Escribe el ID del género asociado a la película (si creaste una película pon "1", si creaste dos películas con diferente género pon "2". ¡Sin las comillas, solo el número!).
 *     responses:
 *       200:
 *         description: Película encontrada.
 * 
 * @swagger
 * /moviesOrder:
 *   get:
 *     summary: Ordenar películas ASC o DESC.
 *     tags:
 *       - Búsqueda y orden de películas
 *     parameters:
 *       - in: query
 *         name: order
 *         required: true
 *         schema:
 *           type: string  
 *         description: Escribe "ASC" para organizar las películas en orden ascendente o pon "DESC" para ordenar las películas en orden descendente (EN MAYÚSCULA).
 *     responses:
 *       200:
 *         description: Películas ordenadas correctamente.
*/


/**
 * @swagger
 * /charactersName:
 *   get:
 *     summary: Buscar personaje por nombre.
 *     tags:
 *       - Búsqueda de personajes
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string  
 *         description: Escribe el nombre del personaje.
 *     responses:
 *       200:
 *         description: Personaje encontrado.
 * 
 * @swagger
 * /charactersAge:
 *   get:
 *     summary: Buscar personaje por edad.
 *     tags:
 *       - Búsqueda de personajes
 *     parameters:
 *       - in: query
 *         name: age
 *         required: true
 *         schema:
 *           type: number  
 *         description: Escribe la edad del personaje.
 *     responses:
 *       200:
 *         description: Personaje encontrado.
 * 
 * @swagger
 * /charactersWeight:
 *   get:
 *     summary: Buscar personaje por peso.
 *     tags:
 *       - Búsqueda de personajes
 *     parameters:
 *       - in: query
 *         name: weight
 *         required: true
 *         schema:
 *           type: number  
 *         description: Escribe el peso del personaje.
 *     responses:
 *       200:
 *         description: Personaje encontrado.
 * 
 * @swagger
 * /charactersIdMovies:
 *   get:
 *     summary: Buscar personaje por ID de película.
 *     tags:
 *       - Búsqueda de personajes
 *     parameters:
 *       - in: query
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: number  
 *         description: Escribe el ID de la película asociada al personaje (si creaste una película pon "1", si creaste dos películas y quieres ver el personaje asociado de la segunda pon "2". ¡Sin las comillas, solo el número!).
 *     responses:
 *       200:
 *         description: Personaje encontrado.
*/


/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Editar Película por ID.
 *     tags:
 *       - Edición
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number  
 *         description: ID de la película a editar (si quieres editar la primera película pon "1", si creaste dos películas y quieres editar la segunda pon "2". ¡Sin las comillas, solo el número!).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Editar Pelicula'
 *     responses:
 *       200:
 *         description: Película editada correctamente.
 * 
 * @swagger
 * /characters/{id}:
 *   put:
 *     summary: Editar Personaje por ID.
 *     tags:
 *       - Edición
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number  
 *         description: ID del personaje a editar (si quieres editar el primer personaje pon "1", si creaste dos personajes y quieres editar el segundo pon "2". ¡Sin las comillas, solo el número!).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Editar Personaje'
 *     responses:
 *       200:
 *         description: Personaje editado correctamente.
 */


/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Eliminar película por ID.
 *     tags:
 *       - Eliminación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number  
 *         description: ID de la película a eliminar (si quieres eliminar la primera película pon "1", si creaste dos películas y quieres eliminar la segunda pon "2". ¡Sin las comillas, solo el número!).
 *     responses:
 *       200:
 *         description: Película eliminada correctamente.
 * 
 * @swagger
 * /characters/{id}:
 *   delete:
 *     summary: Eliminar personaje por ID.
 *     tags:
 *       - Eliminación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number  
 *         description: ID del personaje a eliminar (si quieres eliminar el primer personaje pon "1", si creaste dos personajes y quieres eliminar el segundo pon "2". ¡Sin las comillas, solo el número!).
 *     responses:
 *       200:
 *         description: Personaje eliminado correctamente.
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Registrar Usuario:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Escribe el nombre del usuario.
 *         email:
 *           type: string
 *           description: Escriba el email del usuario.
 *         password:
 *           type: string
 *           description: Escriba la contraseñadel usuario.
 *         confirmPassword:
 *           type: string
 *           description: Vuelva a escribir la contraseña del usuario.
 *         user_name:
 *           type: string
 *           description: Escriba su nombre de usuario.
 *       required:
 *         - name
 *         - email
 *         - password
 *         - confirmPassword
 *         - user_name
 *       example:
 *         name: Esteban
 *         email: esteban.duque911@gmail.com
 *         password: "12345678"
 *         confirmPassword: "12345678"
 *         user_name: EDuqueC7
*/


/**
 * @swagger
 * components:
 *   schemas:
 *     Iniciar Sesion:
 *       type: object
 *       properties:
 *         emailLogin:
 *           type: string
 *           description: Escriba el email registrado.
 *         passwordLogin:
 *           type: string
 *           description: Escriba la contraseña del email registrado.
 *       required:
 *         - emailLogin
 *         - passwordLogin
 *       example:
 *         emailLogin: esteban.duque911@gmail.com
 *         passwordLogin: "12345678"
*/


/**
 * @swagger
 * components:
 *   schemas:
 *     Crear Personaje:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Escribe el nombre del personaje.
 *         imagen:
 *           type: string
 *           description: Agrega el link de la imagen que corresponda al personaje.
 *         edad:
 *           type: integer
 *           description: Escribe la edad del personaje.
 *         peso:
 *           type: number
 *           description: Escriba el peso del personaje.
 *         historia:
 *           type: string
 *           description: Escriba la historia del personaje.
 *         peliculaAsociada:
 *           type: array
 *           items:
 *             type: string
 *           description: Escriba la o las películas asociadas al personaje.
 *       required:
 *         - nombre
 *         - imagen
 *         - edad
 *         - peso
 *         - historia
 *         - peliculaAsociada
 *       example:
 *         nombre: Esteban
 *         imagen: imagendeesteban
 *         edad: 21
 *         peso: 73.5
 *         historia: Joven de 21 años de nacionalidad colombiana
 *         peliculaAsociada: ["Naruto", "Dragon ball z"]
*/


/**
 * @swagger
 * components:
 *   schemas:
 *     Crear Pelicula:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *           description: Escribe el titulo de la pelicula.
 *         imagen:
 *           type: string
 *           description: Agrega el link de la imagen que corresponda a la pelicula.
 *         fechaCreacion:
 *           type: string
 *           description: Escribe la fecha de creacion.
 *         calificacion:
 *           type: number
 *           description: Escribe la calificacion del 1 al 5.
 *         personajeAsociado:
 *           type: array
 *           items:
 *             type: string
 *           description: Escribe a los personajes asociados.
 *         genero:
 *           type: string
 *           description: Escribe el genero de la pelicula (solo 1).
 *         generoImagen:
 *           type: string
 *           description: Agrega el link que corresponda al genero (No es obligatorio)
 *       required:
 *         - titulo
 *         - imagen
 *         - fechaCreacion
 *         - calificacion
 *         - personajeAsociado
 *         - genero
 *       example:
 *         titulo: Dragon Ball Z
 *         imagen: imagendeDragonBallZ
 *         fechaCreacion: 15/09/2000
 *         calificacion: 5
 *         personajeAsociado: ["Esteban", "Jennifer"]
 *         genero: Accion
 *         generoImagen: imagenDeAccion
*/


/**
 * @swagger
 * components:
 *   schemas:
 *     Editar Personaje:
 *       type: object
 *       properties:
 *         nombre:
 *           type: string
 *           description: Escribe el nombre del personaje.
 *         imagen:
 *           type: string
 *           description: Agrega el link de la imagen que corresponda al personaje.
 *         edad:
 *           type: integer
 *           description: Escribe la edad del personaje.
 *         peso:
 *           type: number
 *           description: Escriba el peso del personaje.
 *         historia:
 *           type: string
 *           description: Escriba la historia del personaje.
 *         peliculaAsociada:
 *           type: array
 *           items:
 *             type: string
 *           description: Escriba la o las películas asociadas al personaje.
 *       required:
 *         - nombre
 *         - imagen
 *         - edad
 *         - peso
 *         - historia
 *         - peliculaAsociada
 *       example:
 *         nombre: Juan
 *         imagen: imagendejuan
 *         edad: 22
 *         peso: 72
 *         historia: Joven de 22 años de nacionalidad colombiana
 *         peliculaAsociada: ["Naruto", "Dragon Ball Z"]
*/


/**
 * @swagger
 * components:
 *   schemas:
 *     Editar Pelicula:
 *       type: object
 *       properties:
 *         titulo:
 *           type: string
 *           description: Escribe el titulo de la pelicula.
 *         imagen:
 *           type: string
 *           description: Agrega el link de la imagen que corresponda a la pelicula.
 *         fechaCreacion:
 *           type: string
 *           description: Escribe la fecha de creacion.
 *         calificacion:
 *           type: number
 *           description: Escribe la calificacion del 1 al 5.
 *         personajeAsociado:
 *           type: array
 *           items:
 *             type: string
 *           description: Escribe a los personajes asociados.
 *       required:
 *         - titulo
 *         - imagen
 *         - fechaCreacion
 *         - calificacion
 *         - personajeAsociado
 *       example:
 *         titulo: Dragon Ball Z Kai
 *         imagen: imagendeDragonBallZKai
 *         fechaCreacion: 20/07/1950
 *         calificacion: 3
 *         personajeAsociado: ["Esteban", "Jennifer"]
*/


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Una vez tengas sesion iniciada podras cerrar sesion.
 *     tags:
 *       - Cerrar Sesion
 *     responses:
 *       200:
 *         description: Se ha cerrado sesion correctamente.
*/


router.post("/auth/register", authRegister) 

router.post("/auth/login", authLogin)

router.post("/auth/logout", isAuthenticated, authLogout)

router.get("/characters", isAuthenticated, (req, res) => {
    listadoPersonajes(req, res);
})

router.post("/characters", isAuthenticated, (req, res) => {
    crearPersonaje(req, res);
})

router.put("/characters/:id", isAuthenticated, (req, res) => {
    editarPersonaje(req, res);
})

router.delete("/characters/:id", isAuthenticated, (req, res) => {
    eliminarPersonaje(req, res);
})

router.get("/charactersDetail/:id", isAuthenticated, (req, res) => {
    detallesPersonaje(req, res);
})

router.get("/charactersName", isAuthenticated, (req, res) => {
    buscarPersonajeNombre(req, res);
})

router.get("/charactersAge", isAuthenticated, (req, res) => {
    buscarPersonajeEdad(req, res);
})

router.get("/charactersWeight", isAuthenticated, (req, res) => {
    buscarPersonajePeso(req, res);
})

router.get("/charactersIdMovies", isAuthenticated, (req, res) => {
    buscarPersonajePelicula(req, res);
})

router.post("/movies", isAuthenticated, (req, res) => {
    crearPelicula(req, res);
})

router.get("/movies", isAuthenticated, (req, res) => {
    listadoPeliculas(req, res);
})

router.get("/moviesDetail/:id", isAuthenticated, (req, res) => {
    detallesPelicula(req, res);
})

router.put("/movies/:id", isAuthenticated, (req, res) => {
    editarPelicula(req, res);
})

router.delete("/movies/:id", isAuthenticated, (req, res) => {
    eliminarPelicula(req, res);
})

router.get("/moviesName", isAuthenticated, (req, res) => {
    buscarPeliculaNombre(req, res);
})

router.get("/moviesIdGenre", isAuthenticated, (req, res) => {
    buscarPeliculaGenero(req, res);
})

router.get("/moviesOrder", isAuthenticated, (req, res) => {
    buscarPeliculaOrden(req, res);
})



module.exports = router;