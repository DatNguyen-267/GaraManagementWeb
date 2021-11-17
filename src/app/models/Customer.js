const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const Customer = new Scheme({
    name: {type: String, required: true},
    cardIdentify: {type: String},
    birthday: {type: String},
    address: {type: String},
    phone: {type: String},
    email: {type: String},
    slug: { type: String, slug: "cardIdentify", unique:true },
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Customer.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Customer', Customer)