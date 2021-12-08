const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const ExportVoucher = new Schema({
    of_repair: { type: Schema.Types.ObjectId, ref: 'Repair' },
    exported: { type: Schema.Types.Boolean, default: false },
    date: { type: Schema.Types.Date },
    detail: { type: Schema.Types.ObjectId, ref: 'ExportDetail' },
    export_date: { type: Date },
    
}, {
    timestamps: true,
})

ExportVoucher.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Export_Voucher', ExportVoucher)