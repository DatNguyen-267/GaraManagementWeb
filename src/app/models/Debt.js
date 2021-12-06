const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Debt = new Schema({
    of_reception: {type: Schema.Types.ObjectId, ref: 'Reception'},
    money_pay: { type:Number, default: 0 },
}, {
    timestamps: true,
})

Debt.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Debt', Debt) 