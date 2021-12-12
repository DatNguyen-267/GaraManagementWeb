const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const Account = new Scheme({
    of_employee: { type: Scheme.Types.ObjectId, ref: 'Employee'},
    account: {type: String},
    password: {type: String},
}, {
    timestamps: true,
})
Account.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Account', Account)