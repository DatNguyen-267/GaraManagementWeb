const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const Supply = new Scheme({
    supply_id: {type: String, required: true},
    name: {type: String, required: true},
    amount: {type: Number, required: false, default: 0},
    import_price: {type: Number, required: true},
    sell_price: {type: Number, required: true},
    guarantee_date: {type: Date, required: false},
    slug: { type: String, slug: "name", unique:true },
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Supply.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Supply', Supply)