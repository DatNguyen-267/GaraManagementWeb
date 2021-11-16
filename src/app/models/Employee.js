const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Employee = new Schema({
    name: String,
    date_of_birth: String,
    phone: String,
    address: String,
    cmnd: String,
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