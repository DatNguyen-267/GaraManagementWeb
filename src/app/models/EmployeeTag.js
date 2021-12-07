const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const tag = new Scheme({
    name: {type: String, required: true,},
    salary: {type: String, required: true,default: '0'},
    percent: {type: String, required: true},
    permissions: {type: Array, required: true,default: []},
}, {
    timestamps: true,
})

tag.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('tag', tag)