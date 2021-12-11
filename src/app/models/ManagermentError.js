const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const Error = new Scheme({
    employeeID: {type: String,},
    creatorID: {type: String,},
    creator: {type: String,},
    creatorPhoneNumber: {type: String,},
    date: {type: String,},
    content: {type: String},
    fine: {type: String},
    description: {type: String,default: "Không có"}
}, {
    timestamps: true,
})

Error.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' 
})

module.exports = mongoose.model('error', Error)