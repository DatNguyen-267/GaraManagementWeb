const Repair = require('../models/Repair')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')

const { render } = require('node-sass');
const Reception = require('../models/Reception');
const Repair_Detail_Material = require('../models/Repair_Detail_Material');
var listReception
class RepairController {
    show(req,res,next) {
        // Promise.all([Repair.find({}), Reception.find({})])
        //     .then(([repairs, receptions])=> {
        //         var waitReceptions = []
        //         for (var reception of receptions) {
        //             var check = false;
        //             for (var repair of repairs) {
        //                 if (reception.id === repair.matiepnhan) {
        //                     check = true;
        //                     break;
        //                 }
        //             }
        //             if (check === false) {
        //                 waitReceptions.push(reception)
        //             }
        //         }
        //         res.render('repairs/repair', {
        //             repairs: mutipleMongooseToObject(repairs),
        //             waitReceptions: mutipleMongooseToObject(waitReceptions)
        //         })
        //     })
        // repairs = Repair.find({}).populate('of_reception').exec()
        Repair.findOne({license: 'NN777'}).populate('of_reception', ['receptionDate', 'name'])
            .then((repairs)=> {
                return repairs;
            })
            .then((repairs)=> {
                return Reception.find({})
                    .then((reception)=> {
                        return {reception, repairs}
                    })
            })
            .then ((receptions, repairs)=> {
                res.send({receptions, repairs})
            })
            .catch(next)
        
    }
    create(req,res,next) {
        console.log(req.body)
        var repair = new Repair(req.body)
        Reception.findOne({license: req.body.license})
            .then((reception)=> {
                repair.of_reception = reception;
                repair.quoted = false;
                repair.contracted = false;
                repair.debt = 0;
                repair.status = 'Mới'
                repair.save()
                    .then(()=> {
                        res.redirect('/repairs')
                    })
                    .catch(next)
            })
            .catch(next)  
    }
    edit(req,res,next) {
        Repair.updateOne({_id: req.params.id}, req.body)
            .then(()=> {
                res.redirect('/repairs')
            })
            .catch(next)
    }
    delete(req,res,next) {
        Repair.deleteOne({_id: req.params.id})
            .then(()=> {
                res.redirect('/repairs')
            })
            .catch(next)
    }
    repairDetail(req,res,next) {
        res.render('repairs/repair-detail')
    }
}
module.exports = new RepairController;