const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Reception = new Schema({
    name: {type: String, required: true},
    license: {type: String},
    brand: {type: String},
    phone: {type: String},
    debt: {type: Number},
    receptionDate: {type: String},
    status: {type: String},
    slug: { type: String, slug: "license", unique:true },
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Reception.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Reception', Reception)