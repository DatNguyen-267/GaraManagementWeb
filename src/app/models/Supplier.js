const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const Supplier = new Scheme({
    supplier_id: {type: String, required: true},
    name: { type: String, required: true },
    email: {type: String, required: true},
    telephone: {type: String, required: true},
    slug: { type: String, slug: "name", unique: true },
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Supplier.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Supplier', Supplier)