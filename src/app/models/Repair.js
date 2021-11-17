const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Repair = new Schema({
    of_reception: {type: Schema.Types.ObjectId, ref: 'Reception'},
    customer_name: {type: String},
    license: {type: String},
    debt: {type: Number},
    repairDate: {type: String},
    quoted: {type: Boolean},
    contracted: {type: Boolean},
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