const knex = require('knex')

const options = {
    client: 'sqlite3',
    connection: {
        filename: './myDB.sqlite'
    },
    useNullAsDefault: true
}

async function createTableMessage() {
    const knexInstance = knex(options)
    try {
        const exist = await knexInstance.schema.hasTable('mensajes')
        if (exist) {
            console.log('La tabla mensajes ya existe.')
            return
        }
        await knexInstance.schema.createTable('mensajes', (table) => {
            table.increments('id').primary()
            table.string('email').notNullable()
            table.string('mensaje').notNullable()
            table.string('fecha').notNullable()
        })
    } catch (error) {
        console.error(error.message)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

async function insertMessage(message) {
    const knexInstance = knex(options)
    try {
        console.log(message)
        await knexInstance('mensajes').insert(message).then(data => console.log(data))
        console.log('mensajes guardados con exito')
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        knexInstance.destroy()
    }
}

async function getMessage() {
    const knexInstance = knex(options)
    try {
        const rows = await knexInstance('mensajes').select('*')
        console.log('mensajes encontrados:', rows.length)
        return rows
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        knexInstance.destroy()
    }
}


module.exports = {
    createTableMessage,
    insertMessage,
    getMessage
}