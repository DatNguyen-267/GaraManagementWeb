const Voucher = require('../models/ImportVoucher')
const Supplier = require('../models/Supplier')
const Material = require('../models/Material')
const ImportDetail = require('../models/ImportDetail')
const { mutipleMongooseToObject, mongooseToOject } = require('../../util/mongoose')
const { render } = require('node-sass')
const ImportVoucher = require('../models/ImportVoucher')
const Position = require('../models/Position')

class ImportController {
    show(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => {
                Supplier.find({}).then((suppliers) => {
                    Voucher.find({}).populate('of_supplier', 'name').populate('of_employee', 'name')
                        .then((vouchers) => {
                            res.render('warehouse/import', {
                                vouchers: mutipleMongooseToObject(vouchers),
                                suppliers: mutipleMongooseToObject(suppliers),
                                activeManagementWarehouse: true,
                                activeImport: true,
                                Permissions: mongooseToOject(position.permissions),
                                User: mongooseToOject(res.locals.employee)
                            })
                        })
                }).catch(next)
            })
    }

    create(req, res, next) {
        const newVoucher = new Voucher(req.body)
        newVoucher.of_employee = res.locals.employee._id
        newVoucher.save()
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    delete(req, res, next) {
        const idDelete = req.params.id
        Voucher.deleteOne({ _id: idDelete })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
        ImportDetail.deleteMany({ of_voucher: req.params.id })
    }

    edit(req, res, next) {
        Voucher.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    showDetail(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => {
                ImportDetail.find({ of_voucher: req.params.idVoucher }).populate('material').then((details) => {
                    Voucher.findById(req.params.idVoucher).populate('of_supplier').populate('of_employee', 'name').then((voucher) => {
                        Material.find({ of_supplier: voucher.of_supplier }).then((materials) => {
                            res.render('warehouse/import_detail', {
                                materials: mutipleMongooseToObject(materials),
                                details: mutipleMongooseToObject(details),
                                voucher: mongooseToOject(voucher),
                                isEmpty: (details.length ? false : true),
                                activeManagementWarehouse: true,
                                activeImport: true,
                                Permissions: mongooseToOject(position.permissions),
                                User: mongooseToOject(res.locals.employee)
                            })
                        })
                    })

                })
                    .catch(next)
            })

    }

    addMaterial(req, res, next) {
        const material = new ImportDetail(req.body);
        material.of_voucher = req.params.idVoucher;
        material.save()
            .then(() => {
                ImportVoucher.findById(req.params.idVoucher).then((voucher) => {
                    var total = voucher.total_price + material.amount * material.import_price
                    Material.updateOne({ _id: material.material }, { import_price: material.import_price }).then(() => { })
                    ImportVoucher.updateOne({ _id: req.params.idVoucher }, { total_price: total }).then(() => {
                        res.redirect('/' + res.locals.employee._id + '/import/detail/' + req.params.idVoucher)
                    })
                })
            })
    }

    deleteMaterial(req, res, next) {
        const idDelete = req.params.idDetail
        ImportDetail.findById(idDelete).then((detail) => {
            ImportVoucher.findById(detail.of_voucher).then((voucher) => {
                var total = voucher.total_price - detail.amount * detail.import_price
                ImportVoucher.updateOne({ _id: detail.of_voucher }, { total_price: total }).then(() => {
                    ImportDetail.deleteOne({ _id: idDelete }).then(() => {
                        res.redirect('/' + res.locals.employee._id + '/import/detail/' + voucher._id)
                    })
                })
            })
        })
    }

    editMaterial(req, res, next) {
        ImportDetail.findById(req.params.idDetail).then((detail) => {
            ImportDetail.updateOne({ _id: req.params.idDetail }, req.body).then(() => {
                Material.updateOne({ _id: req.body.material }, { import_price: req.body.import_price }).then(() => { })
                ImportVoucher.findById(detail.of_voucher).then((voucher) => {
                    var total = voucher.total_price - detail.amount * detail.import_price + req.body.amount * req.body.import_price
                    ImportVoucher.updateOne({ _id: detail.of_voucher }, { total_price: total }).then(() => res.redirect('back'))
                })
            })
        })
    }

    importMaterial(req, res, next) {
        ImportDetail.find({ of_voucher: req.params.idVoucher }).then((details) => {
            for (var detail of details) {
                Material.findOne({ _id: detail.material }).then((material) => {
                    var temp = detail
                    Material.updateOne({ _id: detail.material },
                        {
                            amount: material.amount + temp.amount,
                            import_price: temp.import_price
                        })
                        .then(() => { })
                })
            }
        }).then(() => {
            ImportVoucher.updateOne({ _id: req.params.idVoucher }, { imported: true })
                .then(() => res.redirect(`/${res.locals.employee._id}/import`));
        })
    }
}

module.exports = new ImportController;