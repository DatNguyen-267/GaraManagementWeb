const Supplier = require('../models/Supplier')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')

class SupplierController {
    show(req, res, next) {
        Supplier.find({})
            .then((suppliers)=> {
                res.render('warehouse/supplier', {
                    suppliers: mutipleMongooseToObject(suppliers),
                    activeManagementWarehouse: true,
                    activeSupplier: true
                })
            })
            .catch(next)
    }

    create(req, res, next) {
        const newSupplier = new Supplier(req.body)
        newSupplier.save()
            .then(() => {
                res.redirect('/supplier')
            }) 
            .catch(next) 
    }

    delete(req, res, next) {
        const idDelete = req.params.id
        Supplier.delete({_id:idDelete})
            .then(()=> {
                res.redirect('/supplier')
            }) 
            .catch(next)
    }

    edit(req, res, next) {
        Supplier.updateOne({_id:req.params.id}, req.body)
            .then(() => res.redirect('/supplier'))
            .catch(next)
    }
}


module.exports = new SupplierController;