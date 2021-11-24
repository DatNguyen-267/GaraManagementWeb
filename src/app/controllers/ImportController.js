const Voucher = require('../models/ImportVoucher')
const Supplier = require('../models/Supplier')
const Material = require('../models/Material')
const ImportDetail = require('../models/ImportDetail')
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')

class ImportController {
    show(req, res, next) {
        Supplier.find({}).then((suppliers) => {
            Voucher.find({}).populate('of_supplier', 'name')
                .then((vouchers) => {
                    res.render('warehouse/import', {
                        vouchers: mutipleMongooseToObject(vouchers),
                        suppliers: mutipleMongooseToObject(suppliers),
                    })
                })
                .catch(next)
        })
    }

    showDetail(req, res, next) {
        Material.find({}).populate('of_supplier', 'name')
            .then((materials) => {
                ImportDetail.find({ of_voucher: req.params.idVoucher }).then((details) => {
                    
                })
            })
            .catch(next)
    }

    addMaterial(req, res, next) {

    }

    deleteMaterial(req, res, next) {

    }

    create(req, res, next) {
        const newVoucher = new Voucher(req.body)
        newVoucher.save()
            .then(() => {
                res.redirect('/import')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    delete(req, res, next) {
        const idDelete = req.params.id
        Voucher.deleteOne({ _id: idDelete })
            .then(() => {
                res.redirect('/import')
            })
            .catch(next)
    }

    edit(req, res, next) {
        Voucher.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/import'))
            .catch(next)
    }
}


module.exports = new ImportController;