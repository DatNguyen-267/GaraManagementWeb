const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Schema = mongoose.Schema

const Repair_Detail_Material = new Schema({
    content: String,
    material: {type:Schema.Types.ObjectId , ref: "Material" },
    of_repair: {type: Schema.Types.ObjectId , ref: "Repair"},
    amount: Number,
    total_money: Number,
}, {
    timestamps: true,
})

mongoose.plugin(slug)
Repair_Detail_Material.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })

module.exports = mongoose.model('Repair_Detail_Material', Repair_Detail_Material)