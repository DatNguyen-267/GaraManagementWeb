const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Report_Inventory_Detail = new Schema({
    of_report_inventory: {type: Schema.Types.ObjectId, ref: 'Report_Inventory'},
    of_material: {type: Schema.Types.ObjectId, ref: 'Material'},
    first_inventory: {type: Number},
    incurred: {type: Number},
    last_inventory: {type: Number}
    
    
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Report_Inventory_Detail.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Report_Inventory_Detail', Report_Inventory_Detail)