let productsDao


switch (process.env.TYPE_PERSISTENCE) {
    case 'fs':
        const { default: fsDaoProducts } = require('./products/fsDaoProducts')

        productsDao = new fsDaoProducts()

    default:
        const mongoDaoProducts = require('./products/mongoDaoProducts')
        console.log(mongoDaoProducts)
        productsDao = new mongoDaoProducts()
}


module.exports = {
    productsDao
} 