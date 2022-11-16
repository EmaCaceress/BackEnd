const mongoose = require('mongoose');

const mongoContainer = require('../../containers/mongoContainer')

class mongoDaoCarts extends mongoContainer {
	constructor() {
		console.log('You are in mongoDaoCarts')
		super('carrito', mongoose.Schema({
			productos: { type: [], require: true },
		}))
	}

	async upProduct(carrito = { productos: [] }) {
		return super.upProduct(carrito)
	}
}

module.exports = mongoDaoCarts