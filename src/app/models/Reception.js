const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Reception = new Schema({
    of_customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    of_repair: {type: Schema.Types.ObjectId, ref: "Repair"},
    brand: {type: Schema.Types.ObjectId, ref: "Brand"},
    name: {type: String},
    license: {type: String},
    phone: {type: String},
    debt: { type: Number, default: 0},
    total_money: { type: Number ,default: 0},
    receptionDate: {type: String},
    status: { type: String },
    isSuccess: { type: Boolean, default: false },
    isSuccessRepair: { type: Boolean, default: false },
    isDebt: { type: Boolean, default: false },
}, {
    timestamps: true,
})
Reception.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Reception', Reception)