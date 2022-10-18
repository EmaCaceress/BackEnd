const { Server } = require('socket.io')
let io, siguienteId = 3, num = 0, num2 = 0;
let carrito = [
    {
        id: 1,
        title: "silla",
        price: "1500"
    },
    {
        id: 2,
        title: "mesa",
        price: "7800"
    },
];
let historial_mensajes = []

function socketInit(httpServer) {
    io = new Server(httpServer)
    setEvent(io)
}

function setEvent(io) {
    try {
        io.on('connection', (socket) => {
            console.log("usuario conectado", socket.id);

            /* On */
            socket.on('push', (data) => {
                data.id = siguienteId;
                siguienteId++
                carrito.push(data)
                socket.emit('down', carrito)
            });
            socket.on('push_mensaje', (mensaje, callback) => {
                historial_mensajes.push(mensaje)
                callback("Mensaje subido correctamente")
                io.emit('historial_mensajes', historial_mensajes)
            })

            /* Emit */
            socket.emit('down', carrito);
            socket.emit('historial_mensajes', historial_mensajes)

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