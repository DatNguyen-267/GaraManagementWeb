const Voucher = require('../models/ImportVoucher')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')

class ImportController {
    show(req, res, next) {
        Voucher.find({})
            .then((vouchers)=> {
                res.render('warehouse/import', {
                    vouchers: mutipleMongooseToObject(vouchers),
                })
            })
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
        Voucher.deleteOne({_id:idDelete})
            .then(()=> {
                res.redirect('/import')
            }) 
            .catch(next)
    }

    edit(req, res, next) {
        Voucher.updateOne({_id:req.params.id}, req.body)
            .then(() => res.redirect('/import'))
            .catch(next)
    }
}


module.exports = new ImportController;