const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Scheme = mongoose.Schema

const Report_Inventory = new Scheme({
    report_inventory_date: {type: String},
    month: {type: String},
    year: {type: String},
    
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Report_Inventory.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Report_Inventory', Report_Inventory)