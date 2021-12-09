const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const ExportDetail = new Schema({
    of_voucher: { type: Schema.Types.ObjectId, ref: 'Export_Voucher' },
    of_repair_material: {type: Schema.Types.ObjectId, ref: 'Repair_Detail_Material'},
    material: { type: Schema.Types.ObjectId, ref: 'Material' },
    material_name: { type: String },
    amount: { type: Schema.Types.Number },
    sell_price: { type: Schema.Types.Number },
    total_price: { type: Schema.Types.Number }
}, {
    timestamps: true,
})


ExportDetail.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Export_Detail', ExportDetail)