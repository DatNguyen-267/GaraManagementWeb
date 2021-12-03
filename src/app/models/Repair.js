const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Repair = new Schema({
    of_reception: {type: Schema.Types.ObjectId, ref: 'Reception'},
    // employee_create: {type: Schema.Types.ObjectId, ref: 'Employee'},
    customer_name: {type: String},
    license: {type: String},
    debt: {type: Number, default: 0},
    repairDate: {type: String},
    quoted: {type: Boolean, default: false},
    contracted: {type: Boolean, default: false},
    ordered: {type: Boolean, default: false},
    isSuccess:{type: Boolean, default: false},
    edited:{type: Boolean, default: false},
    status: {type: String},
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Repair.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Repair', Repair)