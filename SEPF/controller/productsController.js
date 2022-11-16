const productsDao = (require("../daos")).productsDao
// productsDao.getAll().then(data => console.log(data))
class productsController {
	static getAll() {
		let products = productsDao.getAll()
		return products
	}
	static getId(id) {
		// let productos = this.getAll()
		// let buscado = productos.findIndex(producto => producto.id == id)
		// buscado = { indice: buscado, producto: productos[buscado] }
		try {
			return productsDao.getId(id)
		} catch (error) {
			console.log("Error en controller: ", error)
		}

	}
	static async upProduct(req) {
		await productsDao.upProduct(req)
		return await this.getAll()
	}
	static async edit(req) {
		// let producto = JSON.parse(req.producto)
		// arrayProductos = this.getAll()
		// arrayProductos[producto.indice] = producto.producto
		console.log(req.id)
		await productsDao.edit(req)
		return this.getAll()
	}
	static async deleteId(id) {
		// console.log(id)
		// let producto = this.getId(id)
		// console.log(producto)
		// producto.producto !== undefined
		//     && productsDao.deleteId(producto.indice)
		await productsDao.deleteId(id)
		return await this.getAll() || "no hay objetos"
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