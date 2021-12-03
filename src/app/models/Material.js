const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Material = new Schema({
    name: {type: String},
    of_supplier: {type: Schema.Types.ObjectId, ref: 'Supplier'},
    amount: {type: Number, default: 0},
    import_price: {type: Number},
    sell_price: {type: Number},
    warranty_period: {type: Number},
}, {
    timestamps: true,
})

Material.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Material', Material)