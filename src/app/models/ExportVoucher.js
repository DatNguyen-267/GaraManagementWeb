const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const ExportVoucher = new Schema({
    of_repair: { type: Schema.Types.ObjectId, ref: 'Repair' },
    of_employee: {type: Schema.Types.ObjectId, ref: 'Employee'},
    exported: { type: Schema.Types.Boolean, default: false },
    detail: { type: Schema.Types.ObjectId, ref: 'ExportDetail' },
    total_price: {type: Number, default: 0}
}, {
    timestamps: true,
})

ExportVoucher.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Export_Voucher', ExportVoucher)