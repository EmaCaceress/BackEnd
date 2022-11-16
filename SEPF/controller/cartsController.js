// const fs = require('fs');
// const path = require('path');
// const directory = path.join('bd', 'carrito.json')
// let id = 0;
// let arrayCarrito = [];
// let objetoCarrito

// class Contenedor {
// 	constructor(ruta) {
// 		this.ruta = ruta;
// 	}

// 	// Metodo para subir al archivo nuevos objetos y agregarles sus respectivos Ids
// 	save = (objeto) => {
// 		try {
// 			arrayCarrito = this.getAll()
// 			id = arrayCarrito.length
// 			const tiempoTranscurrido = Date.now()
// 			const hoy = new Date(tiempoTranscurrido)
// 			arrayCarrito.push({ id: id, timeStamp: hoy.toUTCString(), productos: [] })
// 			fs.writeFileSync(this.ruta, JSON.stringify(arrayCarrito, null, 2), 'utf-8')
// 			console.log("Subida realizada correctamente");
// 			return id
// 		}
// 		catch (error) {
// 			console.log("Hubo un error al subir el objeto: ", error.message);
// 		}
// 	}

// 	// Metodo para obtener todos los objetos del archivo producto
// 	getAll = () => {
// 		try {
// 			let contenido = JSON.parse(fs.readFileSync(this.ruta, 'utf-8'));
// 			return contenido;
// 		}
// 		catch (error) {
// 			console.log("Hubo un error al leer el archivo: ", error.message);
// 		}
// 	}
// 	// Metodo para eliminar el objeto del archivo producto, mediante id
// 	deleteById = async (indice) => {
// 		try {
// 			arrayCarrito = this.getAll()
// 			arrayCarrito.splice(indice, 1)
// 			await fs.promises.writeFile(this.ruta, JSON.stringify(arrayCarrito, null, 2))
// 				.then(() => console.log("Objeto borrado correctamente"))
// 		}
// 		catch (error) {
// 			console.log("Hubo un error al borrar el objeto: ", error.message);
// 		}
// 	}

// 	edit = async (carritoEditado) => {
// 		try {
// 			arrayCarrito = this.getAll()
// 			arrayCarrito[carritoEditado.indice] = carritoEditado.carrito
// 			await fs.promises.writeFile(this.ruta, JSON.stringify(arrayCarrito, null, 2))
// 				.then(() => console.log("Objeto Modificado correctamente"))
// 			return "editado correctamente"
// 		}
// 		catch (error) {
// 			console.log("Hubo un error al borrar el objeto: ", error.message);
// 		}
// 	}
// }

// const bd = new Contenedor(directory)
// const productosController = require('./productosController')
const productsController = require('./productsController')
const cartsDao = (require('../daos')).cartsDao
let objetoCarrito


class cartsController {
	// Crea un carrito y retorna el id
	static async createCart() {
		const cart = await cartsDao.upProduct()
		return cart.id
	}

	static async getProductCartId(id) {
		let productos = (await this.getCartId(id)).productos
		return productos
	}

	// Permite obtener el carrito segun su id
	static async getCartId(id) {
		return await cartsDao.getId(id)
	}

	// Sube productos a un carrito solicitado
	static async upProduct(req_carrito, req_prod) {
		objetoCarrito = await this.getCartId(req_carrito)

		objetoCarrito.productos.push(await productsController.getId(req_prod))
		await cartsDao.edit(objetoCarrito)
		return objetoCarrito
	}

	// Elimina el carrito por el id
	static deleteCartId(id) {
		cartsDao.deleteId(id)
		return id
	}

	// Elimina el producto del carrito segun su id
	static async deleteProductId(req_carrito, req_prod) {
		objetoCarrito = await this.getCartId(req_carrito)
		let buscado = objetoCarrito.productos.findIndex(producto => producto._id == req_prod)
		objetoCarrito.productos.splice(buscado, 1)
		cartsDao.edit(objetoCarrito)
		return objetoCarrito
	}
}

module.exports = cartsController;