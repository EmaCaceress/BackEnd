const bd = require('../bd/myDB.js')

class productosController {
    static createTable() {
        return bd.createTable()
    }
    static obtenerProductos() {
        return bd.getProducts()
    }
    static subirProducto(req) {
        return bd.insertProducts(req)
    }
    static modificarProducto(req_data, req_condition) {
        return bd.updateProducts(req_data, req_condition)
    }
    static eliminarId(req_id) {
        return bd.deleteProducts(req_id)
    }
}

module.exports = productosController;