const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Position = new Schema({
    name: String,
    rule_1: Boolean,
    rule_2: Boolean,
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Position.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Position', Position)