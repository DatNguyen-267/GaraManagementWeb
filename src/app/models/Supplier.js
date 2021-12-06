const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const Supplier = new Scheme({
    name: { type: String, required: true },
    email: {type: String, required: true},
    telephone: {type: String, required: true},
    slug: { type: String, slug: "name", unique: true },
}, {
    timestamps: true,
})


Supplier.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Supplier', Supplier)