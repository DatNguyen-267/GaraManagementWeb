const Material = require('../models/Material')
const Supplier = require('../models/Supplier')
const Position = require('../models/Position')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')
const { render } = require('node-sass')

class MaterialController {
    show(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => {
                Supplier.find({}).then((suppliers) => {
                    Material.find({}).populate('of_supplier', 'name')
                        .then((materials) => {
                            res.render('warehouse/material', {
                                materials: mutipleMongooseToObject(materials),
                                suppliers: mutipleMongooseToObject(suppliers),
                                activeManagementWarehouse: true,
                                activeMaterial: true,
                                Permissions: mongooseToOject(position.permissions),
                                User: mongooseToOject(res.locals.employee)
                            })
                        })
                        .catch(next)
                })
            })


    }

    create(req, res, next) {
        const newMaterial = new Material(req.body)
        newMaterial.save()
            .then(() => {
                res.redirect('back')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    delete(req, res, next) {
        const idDelete = req.params.id
        Material.deleteOne({ _id: idDelete })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    edit(req, res, next) {
        Material.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }
}


module.exports = new MaterialController;