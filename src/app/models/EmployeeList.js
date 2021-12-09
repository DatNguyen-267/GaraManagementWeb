const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const employee = new Scheme({
    name: {type: String, required: true},
    CMND: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    Tag: {type: String, required: true},
    salary: {type: String, required: true},
    startDate: {type: String, required: true},
    bonus: {type: String,default: "0 ₫"},
    percent: {type: String, required: true},
}, {
    timestamps: true,
})

employee.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('employee', employee)