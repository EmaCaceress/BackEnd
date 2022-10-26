const fs = require('fs');
const path = require('path');
const directory = path.join('bd', 'carrito.json')
let id = 0;
let arrayCarrito = [];
let objetoCarrito

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }

    // Metodo para subir al archivo nuevos objetos y agregarles sus respectivos Ids
    save = (objeto) => {
        try {
            arrayCarrito = this.getAll()
            id = arrayCarrito.length
            const tiempoTranscurrido = Date.now()
            const hoy = new Date(tiempoTranscurrido)
            arrayCarrito.push({ id: id, timeStamp: hoy.toUTCString(), productos: [] })
            fs.writeFileSync(this.ruta, JSON.stringify(arrayCarrito, null, 2), 'utf-8')
            console.log("Subida realizada correctamente");
            return id
        }
        catch (error) {
            console.log("Hubo un error al subir el objeto: ", error.message);
        }
    }

    // Metodo para obtener todos los objetos del archivo producto
    getAll = () => {
        try {
            let contenido = JSON.parse(fs.readFileSync(this.ruta, 'utf-8'));
            return contenido;
        }
        catch (error) {
            console.log("Hubo un error al leer el archivo: ", error.message);
        }
    }
    // Metodo para eliminar el objeto del archivo producto, mediante id
    deleteById = async (indice) => {
        try {
            arrayCarrito = this.getAll()
            arrayCarrito.splice(indice, 1)
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayCarrito, null, 2))
                .then(() => console.log("Objeto borrado correctamente"))
        }
        catch (error) {
            console.log("Hubo un error al borrar el objeto: ", error.message);
        }
    }

    edit = async (carritoEditado) => {
        try {
            arrayCarrito = this.getAll()
            arrayCarrito[carritoEditado.indice] = carritoEditado.carrito
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayCarrito, null, 2))
                .then(() => console.log("Objeto Modificado correctamente"))
            return "editado correctamente"
        }
        catch (error) {
            console.log("Hubo un error al borrar el objeto: ", error.message);
        }
    }
}

const bd = new Contenedor(directory)
const productosController = require('./productosController')

class carritoController {
    // Crea un carrito y retorna el id
    static crearCarrito() {
        return bd.save()
    }

    static obtenerProductosCarrito(id) {
        return (this.obtenerCarritoId(id)).carrito
    }

    // Permite obtener el carrito segun su id
    static obtenerCarritoId(id) {
        let carritos = bd.getAll()
        let buscado = carritos.findIndex(carrito => carrito.id == id)
        buscado = { indice: buscado, carrito: carritos[buscado] }
        return buscado
    }

    // Sube productos a un carrito solicitado
    static subirProductoCarrito(req_carrito, req_prod) {
        objetoCarrito = this.obtenerCarritoId(req_carrito)
        objetoCarrito.carrito.productos.push((productosController.obtenerProductoId(req_prod)).producto)
        bd.edit(objetoCarrito)
        return (this.obtenerCarritoId(id)).carrito
    }

    // Elimina el carrito por el id
    static eliminarCarrito(id) {
        bd.deleteById((this.obtenerCarritoId(id)).indice)
        return id
    }

    // Elimina el producto del carrito segun su id
    static eliminarProducto(req_carrito, req_prod) {
        console.log(req_carrito)
        objetoCarrito = this.obtenerCarritoId(req_carrito)
        let buscado = objetoCarrito.carrito.productos.findIndex(producto => producto.id == req_prod)
        objetoCarrito.carrito.productos.splice(buscado, 1)
        bd.edit(objetoCarrito)
        return objetoCarrito.carrito
    }
}

module.exports = carritoController;