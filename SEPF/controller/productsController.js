const productsDao = require("../daos")
console.log(productsDao)
class productsController {
    static getAll() {
        return productsDao.getAll()
    }
    static getId(id) {
        // let productos = this.getAll()
        // let buscado = productos.findIndex(producto => producto.id == id)
        // buscado = { indice: buscado, producto: productos[buscado] }
        return productsDao.getId(id)
    }
    static upProduct(req) {
        productsDao.upProduct(req)
        return this.getAll
    }
    static edit(req) {
        // let producto = JSON.parse(req.producto)
        // arrayProductos = this.getAll()
        // arrayProductos[producto.indice] = producto.producto
        productsDao.edit(req)
        return this.getAll
    }
    static deleteId(id) {
        // console.log(id)
        // let producto = this.getId(id)
        // console.log(producto)
        // producto.producto !== undefined
        //     && productsDao.deleteId(producto.indice)
        productsDao.deleteId(id)
        return this.getAll || "no hay objetos"
    }
}

module.exports = productsController;

// {
//   "id": 1,
//   "title": "mesa",
//   "price": "1500"
// },
// {
//   "id": 3,
//   "title": "mesa",
//   "price": "1500"
// },
// {
//   "title": "silla",
//   "price": "14000",
//   "id": 4
// }