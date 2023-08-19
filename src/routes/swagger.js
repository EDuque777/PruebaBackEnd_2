const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Mundo de Disney', 
            version: '1.0.0',
        }
    },
    apis: ['src/routes/index.js']
}

const swaggerSpec = swaggerJsDoc(options);

const swaggerDocs = (app, port) => {
    app.use('/mundoDisney', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/mundoDisney.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    })
    console.log(`Swagger docs available at http://localhost:${port}/mundoDisney`);
}


module.exports = { swaggerDocs };