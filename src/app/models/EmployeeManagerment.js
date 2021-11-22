const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const EmployeeManagerment = new Scheme({
    ID: {type: String, required: true,},
    name: {type: String, required: true,},
    slug: { type: String, slug: "name", unique:true },
}, {
    timestamps: true,
})

mongoose.plugin(slug)
EmployeeManagerment.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('EmployeeManagerment', EmployeeManagerment)