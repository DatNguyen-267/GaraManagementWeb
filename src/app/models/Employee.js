const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Employee = new Schema({
    name: {type: String},
    CMND: {type: String},
    email: {type: String},
    address: {type: String},
    phoneNumber: {type: String},
    salary: {type: String},
    Tag: String,
    percent: String,
    startDate: {type: String},
    position: {type: Schema.Types.ObjectId , ref:'Position'}
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Employee.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Employee', Employee)