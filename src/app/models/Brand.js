const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Brand = new Schema({
    name: {type: String, required: true},
    slug: { type: String, slug: "name", unique:true },
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Brand.plugin(mongooseDelete, {  
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Brand', Brand)