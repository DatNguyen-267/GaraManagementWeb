const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const ImportVoucher = new Schema({
    import_id: { type: String, required: true },
    of_supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    details: { type: Schema.Types.ObjectId, ref: 'ImportDetail' },
    import_date: { type: Date, required: true },
    total_amount: { type: Number, required: false, default: 0 },
}, {
    timestamps: true,
})

ImportVoucher.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Import_Voucher', ImportVoucher)