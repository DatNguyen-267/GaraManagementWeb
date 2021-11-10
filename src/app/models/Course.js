const mongoose = require('mongoose')
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Scheme = mongoose.Schema

const Course = new Scheme({
    name: {type: String, required: true},
    description: {type: String},
    image: {type: String},
    videoId: {type: String, required: true},
    slug: { type: String, slug: "name", unique:true },
    
}, {
    timestamps: true,
})

// Add Plug in
mongoose.plugin(slug)
Course.plugin(mongooseDelete, { 
        deletedAt: true,
        overrideMethods: 'all' 
    })
// exporr
module.exports = mongoose.model('Course', Course)