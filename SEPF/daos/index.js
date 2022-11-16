let productsDao
let cartsDao

switch (process.env.TYPE_PERSISTENCE) {
	case 'fs':
		const fsDaoProducts = require('./products/fsDaoProducts')
		const fsDaoCarts = require('./cart/fsDaoCart')
		cartsDao = new fsDaoCarts()
		productsDao = new fsDaoProducts()
		break;
	case 'mongo':
		const mongoDaoProducts = require('./products/mongoDaoProducts')
		const mongoDaoCarts = require('./cart/mongoDaoCart')
		cartsDao = new mongoDaoCarts()
		productsDao = new mongoDaoProducts()
		break;
}


module.exports = {
	cartsDao,
	productsDao
} 