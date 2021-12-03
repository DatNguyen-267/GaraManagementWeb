const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const ImportDetail = new Schema({
    of_voucher: { type: Schema.Types.ObjectId, ref: 'Import_Voucher' },
    material: { type: Schema.Types.ObjectId, ref: 'Material' },
    import_price: {type: Schema.Types.Number, required: true},
    amount: {type: Schema.Types.Number, requirerd: true}
}, {
    timestamps: true,
})


ImportDetail.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Import_Detail', ImportDetail)