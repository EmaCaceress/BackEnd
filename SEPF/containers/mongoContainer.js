const mongoose = require("mongoose")
const config = require('../config')

try {
	mongoose.connect(config.mongo.URL)
	console.log("Conexion con mongo exitosa")
} catch (error) {
	console.log("Error al conectar con mongo: ", error)
}

class mongoContainer {
	constructor(modelName, schema) {
		this.collection = mongoose.model(modelName, schema)
	}

	async getId(id) {//funciona
		const array = await this.getAll()
		const result = array.filter(obj => obj._id == id)
		return result[0]
	}
	async getAll() {//funciona
		try {
			return await this.collection.find({})
		} catch (error) {
			console.log("Error en mongoContainer:", error)
		}
	}
	async upProduct(obj) {//funciona
		// const user = new this.collection({
		// 	producto: obj.producto,
		// 	precio: obj.precio,
		// 	stock: obj.stock
		// })
		// console.log(this.collection)
		// const result = await user.save()
		// console.log(result)
		const result = await this.collection.create(obj)
		return result
	}
	async edit(obj) {//funciona
		let id = obj._id
		delete obj._id
		return await this.collection.updateOne({ _id: id }, { $set: obj })
	}
	async deleteId(id) {
		console.log(id)
		return await this.collection.deleteOne({ _id: id }).then(data => console.log(data))
	}
}

module.exports = mongoContainer