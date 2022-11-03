const { Server } = require('socket.io')
const productosController = require('./controller/productosController')
const mensajesController = require('./controller/mensajesController')

function socketInit(httpServer) {
    io = new Server(httpServer)
    setEvent(io)
}

function setEvent(io) {
    try {
        io.on('connection', (socket) => {
            console.log("usuario conectado", socket.id);

            socket.on('push', (data) => {
                productosController.subirProducto(data).then(() =>
                    productosController.obtenerProductos().then(data => socket.emit('down', data))
                )
            });
            productosController.obtenerProductos().then(data => socket.emit('down', data))
            /* Carrito */

            /* Mensajes */
            mensajesController.obtenerMensajes().then(data => socket.emit('historial_mensajes', data))
            socket.on('push_mensaje', (mensaje, callback) => {
                mensajesController.subirMensaje(mensaje).then(() => {
                    callback("Mensaje subido correctamente")
                    mensajesController.obtenerMensajes().then(data => io.emit('historial_mensajes', data))
                })

            })

            /* Disconnect */
            socket.on('disconection', (socket) => {
                console.log("usuario desconectado", socket.id)
            });
        });
    }
    catch (error) {
        console.log("Hubo un error: ", error.message)
    }
}

module.exports = {
    socketInit
}