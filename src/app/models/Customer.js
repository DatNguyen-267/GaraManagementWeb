const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const Customer = new Scheme({
    of_reception: [{type: Scheme.Types.ObjectId, ref: 'Reception'}],
    name: {type: String, required: true},
    cardIdentify: {type: String},
    birthday: {type: String},
    address: {type: String},
    phone: {type: String},
    email: {type: String},
    debt: {type: Number, default: 0},
    number_of_reception: {type: Number, default: 0},
}, {
    timestamps: true,
})
Customer.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Customer', Customer)