const mongoose = require("mongoose")
const config = require('../config')

mongoose.connect(config.mongo.URL)

class mongoContainer {
    constructor(modelName, schema) {
        this.collection = mongoose.model(modelName, schema)
    }

    static getId(id) {
        return this.getAll.filter(obj => obj.id === id)
    }
    static getAll() {
        return this.collection.find({})
    }
    static upProduct(obj) {
        const result = this.collection.create(obj)
        return result
    }
    static edit(obj) {
        return this.collection.updateOne({ id: obj.id }, { $set: { "Qty": 40 } })
    }
    static deleteId(id) {
        return this.collection.deleteOne({ id: id })
    }
}

module.exports = mongoContainer