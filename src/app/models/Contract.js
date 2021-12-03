const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Contract = new Schema({
    of_repair: { type: Schema.Types.ObjectId, ref: "Repair" },
    employee_create: { type: Schema.Types.ObjectId, ref: "Employee" },
    exported: { type: Boolean, default: false },
    total_money: String,
}, {
    timestamps: true,
})

Contract.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Contract', Contract)