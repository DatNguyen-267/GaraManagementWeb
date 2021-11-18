const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Repair_Detail_Employee = new Schema({
    of_repair: {type:Schema.Types.ObjectId, ref: "Repair"},
    repair_of_employee: {type:Schema.Types.ObjectId , ref: "Employee" },
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Repair_Detail_Employee.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Repair_Detail_Employee', Repair_Detail_Employee)