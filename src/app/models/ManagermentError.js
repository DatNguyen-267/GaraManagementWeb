const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const Error = new Scheme({
    employeeID: {type: String, required: true,},
    creatorID: {type: String, required: true,},
    creator: {type: String, required: true,},
    creatorPhoneNumber: {type: String, required: true,},
    date: {type: String, required: true,},
    content: {type: String,required: true},
    fine: {type: String, required: true},
}, {
    timestamps: true,
})

Error.plugin(mongooseDelete, { 
    deletedAt: true,
    overrideMethods: 'all' 
})

module.exports = mongoose.model('error', Error)