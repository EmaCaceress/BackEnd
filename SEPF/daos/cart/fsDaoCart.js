const fsContainer = require('../../containers/fsContainer')

class fsDaoProducts extends fsContainer {
	constructor() {
		console.log('You are in fsDaoProducts')
		super('carrito')
	}
	async upProduct(carrito = { productos: [] }) {
		return super.upProduct(carrito)
	}
}

module.exports = fsDaoProducts