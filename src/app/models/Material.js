const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Material = new Schema({
    name: {type: String, required: true},
    of_supplier: {type: Schema.Types.ObjectId, ref: 'Supplier'},
    amount: {type: Number, required: false, default: 0},
    import_price: {type: Number, required: true},
    sell_price: {type: Number, required: true},
    warranty_period: {type: Number, required: false},
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Material.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Material', Material)