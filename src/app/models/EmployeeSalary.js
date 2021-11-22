const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const Scheme = mongoose.Schema

const SalaryInfo = new Scheme({
    ID: {type: String, required: true},
    Salary: {type: String, required: true},
    slug: { type: String, slug: "ID", unique:true },
}, {
    timestamps: true,
})

mongoose.plugin(slug)
SalaryInfo.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('salary', SalaryInfo)