const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Rule = new Scheme({
    content: {type: String, required: true},
    fine: {type: String, required: true},
}, {
    timestamps: true,
})

Rule.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Rule', Rule)