const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const Report_Sale = new Scheme({
    report_sale_date: {type: String, required: true},
    month: {type: String, required: true},
    year: {type: String, required: true},
    total_money: {type: String, required: true},
    
    
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Report_Sale.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Report_Sale', Report_Sale)