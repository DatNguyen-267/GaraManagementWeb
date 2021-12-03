const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const Customer = new Scheme({
    of_reception: [{type: Scheme.Types.ObjectId, ref: 'Reception'}],
    name: {type: String, required: true},
    cardIdentify: {type: String, unique: true},
    birthday: {type: String},
    address: {type: String},
    phone: {type: String},
    email: {type: String},
    debt:Number,
    number_of_reception:Number,
    
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Customer.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Customer', Customer)