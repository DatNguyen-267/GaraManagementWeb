const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const ExportVoucher = new Scheme({
    name: {type: String, required: true},
    slug: { type: String, slug: "name", unique:true },
}, {
    timestamps: true,
})

mongoose.plugin(slug)
ExportVoucher.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('ExportVoucher', ExportVoucher)