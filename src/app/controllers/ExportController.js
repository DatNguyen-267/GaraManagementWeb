const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')
const Repair = require('../models/Repair')
const Repair_Detail_Material = require('../models/Repair_Detail_Material')

class ExportController {
    show(req, res, next) {
        Repair.find({}).then((vouchers) => {
            res.render('warehouse/export', {
                vouchers: mutipleMongooseToObject(vouchers)
            })
        }).catch(next)
    }

    export(req, res, next) {
        Repair_Detail_Material.updateMany({ of_repair: req.params.idRepair, contracted: true}, {exported: true})
            .then(() => {
                res.redirect('/export')
        })
    }

    showDetail(req, res, next) {
        Repair_Detail_Material.find({ of_repair: req.params.idRepair, contracted: true, exported: false }).then((details) => {
            res.render('warehouse/export_detail', {
                details: mutipleMongooseToObject(details)
            })
        }).catch(next)
    }
}


module.exports = new ExportController;