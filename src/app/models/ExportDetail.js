const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const ExportDetail = new Schema({
    of_voucher: { type: Schema.Types.ObjectId, ref: 'Export_Voucher' },
    material: { type: Schema.Types.ObjectId, ref: 'Material' },
    amount: {type: Schema.Types.Number}
}, {
    timestamps: true,
})


ExportDetail.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Export_Detail', ExportDetail)