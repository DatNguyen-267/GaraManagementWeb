const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Setting = new Schema({
    gara_name: {Type: String},
    telephone: {Type: String},
    address: {Type: String},
    email: {Type: String},
    max_receptions: {Type: Number}
}, {
    timestamps: true,
})

Setting.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Setting', Setting)