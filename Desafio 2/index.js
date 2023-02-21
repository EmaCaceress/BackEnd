const fs = require('fs');
let id = 0;
let arrayProductos = [];

class product {
	constructor(title, price, description, code, stock, thumbnail, id) {
		this.title = title;
		this.price = price;
		this.description = description;
		this.code = code;
		this.stock = stock;
		this.thumbnail = thumbnail;
		this.id = id || null;
	}
}

class productManager {
	constructor(array) {
		this.array = array;
	};

	// Metodo para subir al archivo nuevos objetos y agregarles sus respectivos Ids
	save = objeto => {
		try {
			if (this.validar(objeto.code)) {
				console.log("El codigo ya esta utilizado")
				return 0
			}
			objeto.id = id = id + 1;
			this.array.push(objeto);
			console.log("Objeto ", objeto.title, " con id ", objeto.id, " subido correctamente");
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
			return this.array;
		}
		catch (error) {
			console.log("Hubo un error al leer el archivo: ", error.message);
		}
	}
	// Metodo para eliminar el objeto del archivo producto, mediante id
	deleteById = id => {
		try {
			const pos = this.array.map(e => e.id).indexOf(id)
			pos !== -1 && this.array.splice(pos, 1)
			console.log("Objeto ", id, " borrado correctamente")
		}
		catch (error) {
			console.log("Hubo un error al borrar el objeto: ", error.message);
		}
	}

	// Metodo para eliminar todos los objetos del archivo producto
	deleteAll = () => {
		try {
			this.array = []
			console.log("objetos borrados, array:", this.array)
		}
		catch (error) {
			console.log("Hubo un error al borrar los objetos: ", error.message);
		}
	}

	validar = (code) => {
		try {
			if (this.array === undefined) {
				return false
			}

			const result = this.array.some(objeto => objeto.code === code)
			return result
		}
		catch (error) {
			console.log("Hubo un error al validar: ", error.message);
		}
	}
}

/* Objetos */

const moto = new product(
	title = "moto",
	price = "350.000",
	description = "moto piola",
	code = 345,
	stock = 4,
	thumbnail = "https://auteco.vteximg.com.br/arquivos/ids/218549-250-250/benelli-251s-verde-2022-foto1.png?v=637922146008800000",
);
const auto = new product(
	title = "auto bmw",
	price = "3.740.000",
	description = "auto piola",
	code = 345,
	stock = 3,
	thumbnail = "https://i.ytimg.com/vi/7ajGAJA4uYY/maxresdefault.jpg",

);
const auto2 = new product(
	title = "auto bmw",
	price = "3.740.000",
	description = "auto piola",
	code = 346,
	stock = 3,
	thumbnail = "https://i.ytimg.com/vi/7ajGAJA4uYY/maxresdefault.jpg",

);

const bd = new productManager(arrayProductos)
/* Main */

//subimos los objetos a la "base de datos"
bd.save(moto);
bd.save(auto);
bd.save(auto2);

//obtenemos los objetos y en este caso los imprimimos
console.log("Objeto con id ", id, " es:\n", bd.getById(2));
console.log(bd.getAll());

//Eliminamos un objeto y a la vez eliminamos todos los demas con deleteAll
bd.deleteById(1);
console.log(bd.getAll());
bd.deleteAll();