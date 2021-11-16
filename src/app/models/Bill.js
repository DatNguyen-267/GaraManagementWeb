const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Bill = new Scheme({
    of_reception: {type: Scheme.Types.ObjectId, ref: 'Reception'},
    of_repair: {type: Scheme.Types.ObjectId, ref: 'Reception'}
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Bill.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Bill', Bill) 