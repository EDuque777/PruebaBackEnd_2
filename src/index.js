require("dotenv").config()
const server = require('./app');
const { conn } = require('./db');
const port = process.env.PORT || 3001;
const {swaggerDocs: V1SwaggerDocs} = require('./routes/swagger')

conn.sync({ force: false }).then(() => {
  server.listen(port, () => {
    console.log(`Server raised in port ${port}`); 
    V1SwaggerDocs(server, port)
  });
});
