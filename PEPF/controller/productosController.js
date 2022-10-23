const fs = require('fs');
const path = require('path');
const directory = path.join('bd', 'productos.json')
let id = 0;
let arrayProductos = [];

class Producto {
    constructor(title, price, url, id) {
        this.title = title;
        this.price = price;
        this.url = url;
        this.id = id || null;
    }
}

class Contenedor {
    constructor(ruta) {
        this.ruta = ruta;
    }

    // Metodo para subir al archivo nuevos objetos y agregarles sus respectivos Ids
    save = (objeto) => {
        try {
            arrayProductos = this.getAll()
            id = (arrayProductos.length)
            if (Array.isArray(objeto))
                objeto.map(elemento => {
                    elemento.id = id = id + 1;
                    arrayProductos.push(elemento)
                });
            else {
                objeto.id = id = id + 1;
                arrayProductos.push(objeto);
            }
            fs.writeFileSync(this.ruta, JSON.stringify(arrayProductos, null, 2), 'utf-8')
            console.log("Subida realizada correctamente");

        }
        catch (error) {
            console.log("Hubo un error al subir el objeto: ", error.message);
        }
    }
    // Metodo para obtener el objeto del archivo producto, mediante id
    getById = id => {
        try {
            return this.getAll()[id - 1];
        }
        catch (error) {
            console.log("Hubo un error al mostrar el objeto: ", error.message);
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
            arrayProductos = this.getAll()
            arrayProductos.splice(indice, 1)
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayProductos, null, 2))
                .then(() => console.log("Objeto borrado correctamente"))
        }
        catch (error) {
            console.log("Hubo un error al borrar el objeto: ", error.message);
        }
    }

    // Metodo para eliminar todos los objetos del archivo producto
    deleteAll = async () => {
        try {
            arrayProductos = [];
            await fs.promises.unlink(this.ruta)
                .then(() => console.log("objetos borrados"))
        }
        catch (error) {
            console.log("Hubo un error al borrar los objetos: ", error.message);
        }
    }

    edit = async (arrayNuevo) => {
        try {
            await fs.promises.writeFile(this.ruta, JSON.stringify(arrayNuevo, null, 2))
                .then(() => console.log("Objeto Modificado correctamente"))
        }
        catch (error) {
            console.log("Hubo un error al borrar el objeto: ", error.message);
        }
    }
}

const bd = new Contenedor(directory)

class productosController {
    static obtenerProductos() {
        return bd.getAll()
    }
    static obtenerProductoId(id) {
        let productos = this.obtenerProductos()
        let buscado = productos.findIndex(producto => producto.id == id)
        buscado = { indice: buscado, producto: productos[buscado] }
        return buscado
    }
    static subirProducto(req) {
        let data = req
        console.log(req)
        bd.save(data)
        return data
    }
    static modificarProducto(req) {
        let producto = JSON.parse(req.producto)
        arrayProductos = this.obtenerProductos()
        arrayProductos[producto.indice] = producto.producto
        bd.edit(arrayProductos)
    }
    static eliminarId(id) {
        console.log(id)
        let producto = this.obtenerProductoId(id)
        console.log(producto)
        producto.producto !== undefined
            && bd.deleteById(producto.indice)
        return this.obtenerProductos || "no hay objetos"
    }
}

module.exports = productosController;

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