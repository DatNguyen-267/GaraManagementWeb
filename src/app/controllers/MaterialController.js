const Material = require('../models/Material')
const Supplier = require('../models/Supplier')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')

class MaterialController {
    show(req, res, next) {
        Supplier.find({}).then((suppliers) => {
            Material.find({})
                .then((materials) => {
                    res.render('warehouse/material', {
                        materials: mutipleMongooseToObject(materials),
                        suppliers: mutipleMongooseToObject(suppliers),
                    })
                })
                .catch(next)
        })

    }

    create(req, res, next) {
        const newMaterial = new Material(req.body)
        newMaterial.save()
            .then(() => {
                res.redirect('/material')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    delete(req, res, next) {
        const idDelete = req.params.id
        Material.deleteOne({_id:idDelete})
            .then(()=> {
                res.redirect('/material')
            }) 
            .catch(next)
    }

    edit(req, res, next) {
        Material.updateOne({_id:req.params.id}, req.body)
            .then(() => res.redirect('/material'))
            .catch(next)
    }
}


module.exports = new MaterialController;