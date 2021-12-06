const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const tag = new Scheme({
    name: {type: String, required: true,},
    salary: {type: String, required: true,default: '0'},
    permissions: {type: Array, required: true,default: []},
}, {
    timestamps: true,
})

tag.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('tag', tag)