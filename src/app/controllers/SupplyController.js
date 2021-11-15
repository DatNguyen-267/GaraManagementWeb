const Supply = require('../models/Supply')
const Supplier = require('../models/Supplier')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')

class SupplyController {
    show(req, res, next) {
        Supplier.find({}).then((suppliers) => {
            Supply.find({})
                .then((supplies) => {
                    res.render('warehouse/supplies', {
                        supplies: mutipleMongooseToObject(supplies),
                        suppliers: mutipleMongooseToObject(suppliers),
                    })
                })
                .catch(next)
        })

    }

    create(req, res, next) {
        const newSupply = new Supply(req.body)
        newSupply.save()
            .then(() => {
                res.redirect('/supply')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    delete(req, res, next) {
        const idDelete = req.params.id
        Supply.deleteOne({_id:idDelete})
            .then(()=> {
                res.redirect('/supply')
            }) 
            .catch()
    }
}


module.exports = new SupplyController;