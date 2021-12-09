const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')
const Scheme = mongoose.Schema

const SalaryInfo = new Scheme({
    month: {type: String, required: true},
    eIDs: {type: Array, required: true},
    bonusInfos: {type: Array, required: true},
    errorInfos: {type: Array, required: true},
    finalSalarys: {type: Array, required: true},
}, {
    timestamps: true,
})

SalaryInfo.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('salaryInfos', SalaryInfo)