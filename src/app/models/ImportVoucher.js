const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const ImportVoucher = new Schema({
    of_supplier: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    detail: { type: Schema.Types.ObjectId, ref: 'ImportDetail' },
    of_employee: {type: Schema.Types.ObjectId, ref: 'Employee'},
    import_date: { type: Date },
    total_price: { type: Number, default: 0 },
    imported: {type: Boolean, default: false}
}, {
    timestamps: true,
})

ImportVoucher.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Import_Voucher', ImportVoucher)