const bd = require('../bd/sqlite.js')

class productosController {
    static createTable() {
        return bd.createTableMessage()
    }
    static obtenerMensajes() {
        return bd.getMessage()
    }
    static subirMensaje(req) {
        return bd.insertMessage(req)
    }
}

module.exports = productosController;