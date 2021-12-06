const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Bill = new Schema({
    of_reception: {type: Schema.Types.ObjectId, ref: 'Reception'},
    money_pay: Number,
}, {
    timestamps: true,
})

Bill.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Bill', Bill) 