const Reception = require('../models/Reception')
const Customer =require('../models/Customer')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')
class ReceptionController {
    show(req,res,next) {
        Reception.find({})
            .then(Receptions => {
                res.render('receptions/reception', {
                    Receptions: mutipleMongooseToObject(Receptions)})
            }) 
            .catch(next)
    }
    create(req,res,next){
        const reception = new Reception(req.body)
        reception.debt = 0
        reception.status = 'New'
        reception.save()
            .then(()=> {
                res.redirect('/reception')
            })
            .catch(next)
    }
    edit(req,res,next){
        Reception.updateOne({_id:req.params.id}, req.body)
            .then(() => res.redirect('/reception'))
            .catch(next)
    }
    delete(req,res,next){
        Reception.delete({_id: req.params.id})
            .then(()=> {
                res.redirect('/reception')
            })
            .catch(next)
    }
}
module.exports = new ReceptionController;