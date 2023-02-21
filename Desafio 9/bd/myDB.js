const knex = require('knex')

const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'ecommerce'
    },
}

async function createTable() {
    const knexInstance = knex(options)
    try {
        const exist = await knexInstance.schema.hasTable('productos')
        if (exist) {
            console.log('La tabla productos ya existe.')
            return
        }
        await knexInstance.schema.createTable('productos', (table) => {
            table.increments('id').primary()
            table.string('producto', 15).notNullable()
            table.float('precio').notNullable()
        })
    } catch (error) {
        console.error(error.message)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

async function insertProducts(products) {
    const knexInstance = knex(options)
    try {
        console.log(products)
        await knexInstance('productos').insert(products).then(data => console.log(data))
        console.log('Productos creados con exito')
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

async function getProducts() {
    const knexInstance = knex(options)
    try {
        const rows = await knexInstance('productos').select('*')
        console.log('Productos encontrados:', rows.length)
        return rows
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

async function updateProducts(data, conditons) {
    const knexInstance = knex(options)
    try {
        await knexInstance('productos').update(data).where(conditons)
        console.log('productos editados')
    } catch (error) {
        console.error(error.message)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

async function deleteProducts(conditions) {
    const knexInstance = knex(options)
    try {
        if (conditions) {
            await knexInstance.from('productos').del().where(conditions)
        } else {
            await knexInstance.from('productos').del()
        }
        console.log('productos eliminados')
    } catch (error) {
        console.error(error.message)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

module.exports = {
    createTable,
    insertProducts,
    getProducts,
    updateProducts,
    deleteProducts
}