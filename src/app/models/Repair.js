const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const Repair = new Scheme({
    matiepnhan: {type: String, required: true},
    tenkhachhang: {type: String},
    bienso: {type: String},
    tienno: {type: Number},
    ngaysuachua: {type: String},
    baogia: {type: Boolean},
    hopdong: {type: Boolean},
    trangthai: {type: String},
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Repair.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Repair', Repair)