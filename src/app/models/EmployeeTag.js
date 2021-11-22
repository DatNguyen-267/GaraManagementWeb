const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const tag = new Scheme({
    ID: {type: String, required: true},
    name: {type: String, required: true},
    count: {type: String, required: true,default: '0'},
    slug: { type: String, slug: "name", unique:true },
}, {
    timestamps: true,
})

mongoose.plugin(slug)
tag.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('tag', tag)