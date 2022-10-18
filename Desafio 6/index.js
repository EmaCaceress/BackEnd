const express = require('express');
const http = require("http");
const path = require('path');
const productos = require('./routes/productos')
const handlebars = require('express-handlebars');
const PORT = process.env.NODE_PORT;
const { initSocket, socketInit } = require('./socket')

const app = express();
/* Middleware a nivel de aplicacion */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.set("views", path.join(__dirname, 'views'))
app.engine("handlebars", handlebars.engine())
app.set('view engine', 'handlebars')
app.use('/', productos)
/* Escuchamos server */
const server = http.createServer(app);
socketInit(server)
server.listen(PORT, () => {
    console.log(`servidor express escuchando en el puerto ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error en el servidor: ${error}`));
