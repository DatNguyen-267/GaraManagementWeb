const Repair = require('../models/Repair')
const Material = require('../models/Material')
const Employee = require('../models/Employee')
const Wage = require('../models/Wage')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')

const { render } = require('node-sass');
const Reception = require('../models/Reception');
const Repair_Detail_Material = require('../models/Repair_Detail_Material');
var listReception
class RepairController {
    show(req,res,next) {
        Repair.find({}).populate('of_reception')
            .then((repairs)=> {
                Reception.find({})
                    .then((receptions)=> {
                        var waitReceptions =  receptions.map((reception, index)=> {
                            if (!(reception.repair != null )) {
                                return reception
                            }
                        })
                        var check
                        if (waitReceptions.some(el => el == null)) check = true
                            else check = false
                        // res.send(check)
                        res.render('repairs/repair', {
                            repairs: mutipleMongooseToObject(repairs),
                            waitReceptions: function() {
                                if (check) return waitReceptions
                                else return mutipleMongooseToObject(waitReceptions)
                            }
                        })
                    })
                    .catch(next)
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
    repairDetail(req, res, next) {
        
        Repair.findOne({_id: req.params.id}).populate('of_reception')
            .then((repair)=> {
                return Material.find({})
                    .then((materials) => {
                        return Wage.find({})
                            .then((wages) => {
                                return Employee.find({})
                                    .then((employees)=> {
                                        return {
                                            repair,
                                            materials,
                                            wages,
                                            employees,
                                        }
                                    }) 
                            })
                    })
            })
            .then((data) => {
                res.render('repairs/repair-detail', {
                            Repair: mongooseToOject(data.repair),
                            Materials: mutipleMongooseToObject(data.materials),
                            Employees: mutipleMongooseToObject(data.employees),
                            Wages: mutipleMongooseToObject(data.wages),
                        })
            })
            .catch(next)
        
    }
    quote(req,res,next) {
        res.render('repairs/quote')
    }
    createMaterial(req, res, next) {
        repairDetailMaterial = new Repair_Detail_Material(req.body)

    }
}
module.exports = new RepairController;