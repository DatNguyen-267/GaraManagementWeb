const mongoose = require('mongoose')

const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Position = new Schema({
    name: String,
    salary: {type: String, default: '0'},
    percent: {type: String},
    permissions: {type:Array}
}, {
    timestamps: true,
})


Position.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Position', Position)