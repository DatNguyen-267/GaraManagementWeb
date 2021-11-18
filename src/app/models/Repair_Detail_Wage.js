const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Repair_Detail_Wage = new Schema({
    wage: {type:Schema.Types.ObjectId , ref: "Wage" },
    of_repair: {type:Schema.Types.ObjectId , ref: "Repair" },
    
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Repair_Detail_Wage.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Repair_Detail_Wage', Repair_Detail_Wage)