const Supplier = require('../models/Supplier')
const Material = require('../models/Material')
const ImportVoucher = require('../models/ImportVoucher')
const Position = require('../models/Position')
const { mutipleMongooseToObject, mongooseToOject } = require('../../util/mongoose')
const { render } = require('node-sass')

class SupplierController {
    show(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => {
                Supplier.find({})
                    .then((suppliers) => {
                        res.render('warehouse/supplier', {
                            suppliers: mutipleMongooseToObject(suppliers),
                            activeManagementWarehouse: true,
                            activeSupplier: true,
                            Permissions: mongooseToOject(position.permissions),
                            User: mongooseToOject(res.locals.employee)
                        })
                    })
                    .catch(next)
            })

    }

    create(req, res, next) {
        const newSupplier = new Supplier(req.body)
        newSupplier.save()
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    delete(req, res, next) {
        const idDelete = req.params.id
        Material.find({ of_supplier: idDelete }).then((materials) => {
            ImportVoucher.find({of_supplier: idDelete }).then((vouchers) => {
                if(materials.length == 0 && vouchers.length == 0) {
                    Supplier.delete({ _id: idDelete })
                    .then(() => {
                        res.redirect('back')
                    })
                    .catch(next)
                } else {
                    res.redirect('back')
                }
            })
        })
    }

    edit(req, res, next) {
        Supplier.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }
}


module.exports = new SupplierController;