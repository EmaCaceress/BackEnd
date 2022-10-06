const express = require('express');
const useragent = require('express-useragent');
const path = require('path');
const productos = require('./routes/productos')
let hola = 1;
const ENV = process.env.NODE_ENV;
const PORT = process.env.NODE_PORT;

const app = express();
/* Middleware a nivel de aplicacion */
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use((req, res, next) => {
    console.log("hola", hola)
    hola++
    next();
})

/* Middleware incorporados */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* Middleware de manejo de errores */
app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Algo salio mal!')
})
/* Middleware de terceros */
app.use(useragent.express())

app.use('/', productos)

/* Escuchamos server */
const server = app.listen(PORT, () => {
    console.log(`servidor express escuchando en el puerto ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error en el servidor: ${error}`));
