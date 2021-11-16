const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Material = new Schema({
    name: String,
    sale_price: Number, 
    purchase_price: Number,
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Material.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Material', Material)