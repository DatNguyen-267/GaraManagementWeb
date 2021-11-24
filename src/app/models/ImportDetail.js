const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const ImportDetail = new Schema({
    of_voucher: { type: Schema.Types.ObjectId, ref: 'Import_Voucher' },
    material_list: [{ type: Schema.Types.ObjectId, ref: 'Material' }],
}, {
    timestamps: true,
})


ImportDetail.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('Import_Detail', ImportDetail)