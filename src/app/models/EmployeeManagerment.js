const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const DateOff = new Scheme({
    employeeID: {type: String, required: true,},
    creatorID: {type: String, required: true,},
    creator: {type: String, required: true,},
    creatorPhoneNumber: {type: String, required: true,},
    startDate: {type: String, required: true,},
    endDate: {type: String, required: true,},
    havePermission: {type: String,required: true},
    reson: {type: String, required: true},
}, {
    timestamps: true,
})

DateOff.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('dateoff', DateOff)