const express = require('express');
const http = require("http");
const path = require('path');
const useragent = require('express-useragent');
const productos = require('./routes/productos')
const carrito = require('./routes/carrito')
const PORT = process.env.NODE_PORT;
const app = express();
const session = require("express-session")

/* Session */


/* Middleware a nivel de aplicacion */

app.use((req, res, next) => {
    console.log("Bienvenido",)
    next();
})
app.use(session({
    secret: process.env.SESSION_SECRET || 'some-secret',
    resave: false, // investigar mas -> https://www.npmjs.com/package/express-session 
    saveUninitialized: false,
    active: false
}))

/* Middleware incorporados */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

/* Middleware de manejo de errores */
app.use(function (err, req, res, next) {
    console.log(err.stack)
    res.status(500).send('Algo salio mal!')
})

/* Middleware de terceros */
app.use(useragent.express())

/* Comunicamos la api */
app.post('/login', (req, res) => {
    console.log(req.body)
    if (req.body.cargo) {
        req.session.admin = true;
    } else {
        req.session.admin = false;
    }
    res.status(200).send("logueado correctamente")
})

app.use('/api', productos, carrito)

/* Escuchamos server */
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`servidor express escuchando en el puerto ${server.address().port}`)
})
server.on("error", (error) => console.log(`Error en el servidor: ${error}`));

module.exports = app