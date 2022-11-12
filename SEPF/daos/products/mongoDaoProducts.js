const mongoose = require('mongoose');

const mongoContainer = require('../../containers/mongoContainer')

class mongoDaoProducts extends mongoContainer {
    constructor() {
        console.log('You are in mongoDaoProducts')
        super('Products', mongoose.Schema({
            title: { type: String, require: true },
            price: { type: Number, require: true }
        }))
    }
}

module.exports = mongoDaoProducts