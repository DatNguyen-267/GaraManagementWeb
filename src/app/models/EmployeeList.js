const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const employee = new Scheme({
    ID: {type: String, required: true},
    name: {type: String, required: true},
    CMND: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    Tag: {type: String, required: true},
    slug: { type: String, slug: "name", unique:true },
}, {
    timestamps: true,
})

mongoose.plugin(slug)
employee.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('employee', employee)