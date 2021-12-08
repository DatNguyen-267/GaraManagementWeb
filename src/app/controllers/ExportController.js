const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')
const ExportVoucher = require('../models/ExportVoucher')
const ExportDetail = require('../models/ExportDetail')
const Repair = require('../models/Repair')
const Repair_Detail_Material = require('../models/Repair_Detail_Material')

class ExportController {
    show(req, res, next) {
        Repair.find({}).then((repairs) => {
            let list = []
            for (var repair of repairs) {
                Repair_Detail_Material.find({ of_repair: repair._id }).then((materials) => {
                    if (materials.length) {
                        list.push(repair)
                    }
                }).then(() => { })
            }

            ExportVoucher.find({ exported: false }).then((vouchers) => {
                res.render('warehouse/export', {
                    vouchers: mutipleMongooseToObject(vouchers),
                    repairs: mutipleMongooseToObject(list),
                    activeManagementWarehouse: true,
                    activeExport: true
                })
            })
        })
            .catch(next)
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
                        res.redirect('/export')
                    })
                })
        })
            .catch(next)
    }

    export(req, res, next) {
        ExportVoucher.updateOne({ _id: req.params.idVoucher }, { exported: true }).then(() => {
            ExportDetail.find({ of_voucher: req.params.idVoucher }).then((details) => {
                for (var detail of details) {
                    Repair_Detail_Material.updateOne({ _id: detail.of_repair_material }, { exported: true })
                        .then(() => { })
                }
            }).then(() => {
                res.redirect('/export')
            })
        })
            .catch(next)
    }

    showDetail(req, res, next) {
        ExportDetail.find({ of_voucher: req.params.idVoucher }).then((details) => {
            res.render('warehouse/export_detail', {
                details: mutipleMongooseToObject(details)
            })
        })
    }
}


module.exports = new ExportController;