const FirebaseAdmin = require('firebase-admin')
const { v4: uuidv4 } = require('uuid')

const cert = require("../emanuel-1af3c-firebase-adminsdk-462nj-8eba54ec3f.json");

FirebaseAdmin.initializeApp({
	credential: FirebaseAdmin.credential.cert(cert)
})

console.log('Conectados a Firebase!')

let targetId

class fsContainer {
	constructor(collection) {
		this.db = FirebaseAdmin.firestore()
		this.collection = this.db.collection(collection)
	}

	async upProduct(obj) {
		try {
			let id = uuidv4()
			let doc = this.collection.doc(id)
			await doc.create(obj)
			let object = { ...obj, id: id }
			return object
			console.log('[createUsers] Producto creado con éxito!')
		} catch (error) {
			console.error('[createUsers] Ocurrio un error ->', error.message)
		}
	}

	async getAll() {
		try {
			const querySnapshot = await this.collection.get()
			let docs = querySnapshot.docs
			const response = docs.map(doc => ({ id: doc.id, ...doc.data() }))
			console.log('[getAll] Productos obtenidos con éxito! ->', response)
			return response
		} catch (error) {
			console.error('[getAll] Ocurrio un error al intentar obtener productos  ->', error.message)
		}
	}

	async getId(id) {
		try {
			const doc = this.collection.doc(id)
			const item = await doc.get()
			const response = { ...(item.data()), _id: id }
			if (response) {
				console.log(`[getId] producto ${id} obtenido con éxito! ->`, response)
			} else {
				console.log(`[getId] producto ${id} no encontrado`)
			}
			return response
		} catch (error) {
			console.error(`[getId] Ocurrio un error al intenter obtener producto ${id} ->`, error.message)
		}
	}

	async edit(obj) {
		try {
			const newObj = obj
			if (!obj.id) {
				obj.id = obj._id
				delete newObj._id
			}
			const doc = this.collection.doc(obj.id)
			delete newObj.id

			await doc.update(obj)
			console.log(`[edit] producto ${obj.id} actualizado con éxito!`)
		} catch (error) {
			console.error(`[edit] Ocurrio un error al intentar actualizar producto ${obj.id} ->`, error.message)
		}
	}

	async deleteId(id) {
		try {
			const doc = this.collection.doc(id)
			await doc.delete()
			console.log(`[deleteId] producto ${id} eliminado con éxito!`)
		} catch (error) {
			console.error(`[deleteId] Ocurrio un error al intentar eliminar producto ${id} ->`, error.message)
		}
	}
}

module.exports = fsContainer;

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
// 	deleteId = async (indice) => {
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

// class carritoController {
//     // Crea un carrito y retorna el id
//     static crearCarrito() {
//         return bd.save()
//     }

//     static obtenerProductosCarrito(id) {
//         return (this.obtenerCarritoId(id)).carrito
//     }

//     // Permite obtener el carrito segun su id
//     static obtenerCarritoId(id) {
//         let carritos = bd.getAll()
//         let buscado = carritos.findIndex(carrito => carrito.id == id)
//         buscado = { indice: buscado, carrito: carritos[buscado] }
//         return buscado
//     }

//     // Sube productos a un carrito solicitado
//     static subirProductoCarrito(req_carrito, req_prod) {
//         objetoCarrito = this.obtenerCarritoId(req_carrito)
//         objetoCarrito.carrito.productos.push((productosController.obtenerProductoId(req_prod)).producto)
//         bd.edit(objetoCarrito)
//         return (this.obtenerCarritoId(id)).carrito
//     }

//     // Elimina el carrito por el id
//     static eliminarCarrito(id) {
//         bd.deleteById((this.obtenerCarritoId(id)).indice)
//         return id
//     }

//     // Elimina el producto del carrito segun su id
//     static eliminarProducto(req_carrito, req_prod) {
//         console.log(req_carrito)
//         objetoCarrito = this.obtenerCarritoId(req_carrito)
//         let buscado = objetoCarrito.carrito.productos.findIndex(producto => producto.id == req_prod)
//         objetoCarrito.carrito.productos.splice(buscado, 1)
//         bd.edit(objetoCarrito)
//         return objetoCarrito.carrito
//     }
// }

// module.exports = carritoController;