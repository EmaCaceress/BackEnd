let productos = [
    {
        id: 1,
        title: "mesa de pino 1.50",
        price: 8000,
    },
    {
        id: 2,
        title: "sofa de tercio pelo",
        price: 23000,
    },
    {
        id: 3,
        title: "silla indu",
        price: 1500,
    }
]

let siguienteId = 4

class productosController {
    static obtenerProductos() {
        return productos
    }
    static obtenerProductoId(id) {
        let buscado = productos.findIndex(producto => producto.id == id)
        buscado = { indice: buscado, producto: productos[buscado] }
        console.log(buscado)
        return buscado
    }
    static subirProducto(req) {
        let data = req
        data.id = siguienteId
        productos.push(data)
        siguienteId++
        return data
    }
    static modificarProducto(req) {
        let producto = JSON.parse(req.producto)
        console.log(producto.producto)
        productos[producto.indice] = producto.producto
    }
    static eliminarId(id) {
        console.log(id);
        let producto = this.obtenerProductoId(id)
        productos.splice(producto.indice, 1)
        return productos
    }
}

module.exports = productosController;