const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const ExportVoucher = new Scheme({
    of_repair: { type: Schema.Types.ObjectId, ref: 'Repair' },
    detail: { type: Schema.Types.ObjectId, ref: 'ExportDetail' },
    exported: { type: Scheme.Types.Boolean, default: false }
}, {
    timestamps: true,
})

ExportVoucher.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Export_Voucher', ExportVoucher)