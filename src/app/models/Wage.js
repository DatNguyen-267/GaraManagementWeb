const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Wage = new Schema({
    name: String, 
    money: Number, 
    of_supplier: {type:Schema.Types.ObjectId, ref: 'Supplier'}
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Wage.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Wage', Wage)