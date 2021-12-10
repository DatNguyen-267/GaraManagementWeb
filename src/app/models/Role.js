const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Role = new Schema({
    name:  { type: String},
    tag: { type: String},
}, {
    timestamps: true,
})

Role.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Role', Role)