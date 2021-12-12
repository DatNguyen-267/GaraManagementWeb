const { mutipleMongooseToObject, mongooseToOject } = require('../../util/mongoose')
const { render } = require('node-sass')
const ExportVoucher = require('../models/ExportVoucher')
const ExportDetail = require('../models/ExportDetail')
const Repair = require('../models/Repair')
const Material = require('../models/Material')
const Repair_Detail_Material = require('../models/Repair_Detail_Material')
const Position = require('../models/Position')

class ExportController {
    show(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => {
                Repair.find({}).then((repairs) => {
                    let list = []
                    for (var repair of repairs) {
                        Repair_Detail_Material.find({ of_repair: repair._id, contracted: true, exported: false }).then((materials) => {
                            if (materials.length) {
                                list.push(repair)
                            }
                        }).then(() => { })
                    }

                    ExportVoucher.find({}).then((vouchers) => {
                        res.render('warehouse/export', {
                            vouchers: mutipleMongooseToObject(vouchers),
                            repairs: mutipleMongooseToObject(list),
                            activeManagementWarehouse: true,
                            activeExport: true,
                            Permissions: mongooseToOject(position.permissions),
                            User: mongooseToOject(res.locals.employee)
                        })
                    })
                })
                    .catch(next)
            })
    }

    create(req, res, next) {
        ExportVoucher.deleteOne({ of_repair: req.body.of_repair, exported: false }).then(() => {
            const newVoucher = new ExportVoucher(req.body)
            newVoucher.save()
                .then(() => {
                    Repair_Detail_Material.find({ of_repair: req.body.of_repair, contracted: true, exported: false }).then((details) => {
                        for (var detail of details) {
                            const newMaterial = new ExportDetail()
                            newMaterial.of_voucher = newVoucher._id
                            newMaterial.of_repair_material = detail._id
                            newMaterial.material = detail.material
                            newMaterial.material_name = detail.material_name
                            newMaterial.amount = detail.amount
                            newMaterial.sell_price = detail.sell_price
                            newMaterial.save().then(() => { })
                        }
                    }).then(() => {
                        res.redirect('back')
                    })
                })
        })
            .catch(next)
    }

    export(req, res, next) {
        ExportVoucher.updateOne({ _id: req.params.idVoucher }, { exported: true }).then(() => {
            ExportDetail.find({ of_voucher: req.params.idVoucher }).then((details) => {
                for (var detail of details) {
                    var temp = detail
                    Repair_Detail_Material.updateOne({ _id: temp.of_repair_material }, { exported: true })
                        .then(() => {
                            Material.findOne({ _id: temp.material }).then((material) => {
                                Material.updateOne({ _id: temp.material },
                                    {
                                        amount: material.amount - temp.amount,
                                        import_price: temp.import_price
                                    })
                                    .then(() => { })
                            })
                        })
                }
            }).then(() => {
                res.redirect('/' + res.locals.employee._id + '/export')
            })
        })
            .catch(next)
    }

    showDetail(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => {
                ExportDetail.find({ of_voucher: req.params.idVoucher }).then((details) => {
                    ExportVoucher.findById(req.params.idVoucher).populate('of_repair').then((voucher) => {
                        res.render('warehouse/export_detail', {
                            details: mutipleMongooseToObject(details),
                            voucher: mongooseToOject(voucher),
                            activeManagementWarehouse: true,
                            activeExport: true,
                            Permissions: mongooseToOject(position.permissions),
                            User: mongooseToOject(res.locals.employee)
                        })
                    })
                })
            })

    }
}


module.exports = new ExportController;