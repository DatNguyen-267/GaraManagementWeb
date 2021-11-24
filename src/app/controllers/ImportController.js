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
        })
            .catch(next)
    }

    showDetail(req, res, next) {
        ImportDetail.find({ of_voucher: req.params.idVoucher }).populate('material').then((details) => {
            Voucher.findById(req.params.idVoucher).then((voucher) => {
                Material.find({ of_supplier: voucher.of_supplier }).then((materials) => {
                    res.render('warehouse/import_detail', {
                        materials: mutipleMongooseToObject(materials),
                        details: mutipleMongooseToObject(details)
                    })
                })
            })

        })
            .catch(next)
    }

    addMaterial(req, res, next) {
        const material = new ImportDetail(req.body);
        material.of_voucher = req.params.idVoucher;
        material.save()
            .then(() => {
                res.redirect(`/import/detail/${req.params.idVoucher}`)
            })
    }

    deleteMaterial(req, res, next) {
        const idDelete = req.params.idDetail
        ImportDetail.deleteOne({ _id: idDelete })
            .then(() => {
                res.redirect(`/import/detail/${req.params.idVoucher}`)
            })
            .catch(next)
    }

    editMaterial(req, res, next) {
        ImportDetail.updateOne({ _id: req.params.idDetail }, req.body)
            .then(() => res.redirect(`/import/detail/${req.params.idVoucher}`))
            .catch(next)
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

const updateTotalPrice = () => {
    
}

module.exports = new ImportController;