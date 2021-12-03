const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Report_Sale_Detail = new Schema({
    of_report_sale: {type: Schema.Types.ObjectId, ref: 'Report_Sale'},
    of_reception: {type: Schema.Types.ObjectId, ref: 'Reception'},
    
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Report_Sale_Detail.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Report_Sale_Detail', Report_Sale_Detail)