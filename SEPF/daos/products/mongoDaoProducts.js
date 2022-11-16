const mongoose = require('mongoose');

const mongoContainer = require('../../containers/mongoContainer')

class mongoDaoProducts extends mongoContainer {
	constructor() {
		console.log('You are in mongoDaoProducts')
		super('productos', mongoose.Schema({
			producto: { type: String, require: true },
			precio: { type: Number, require: true },
			stock: { type: Number, require: true }
		}))
	}
}

module.exports = mongoDaoProducts