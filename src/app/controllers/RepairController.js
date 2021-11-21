const Repair = require('../models/Repair')
const Material = require('../models/Material')
const Employee = require('../models/Employee')
const Wage = require('../models/Wage')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')

const { render } = require('node-sass');
const Reception = require('../models/Reception');
const Repair_Detail_Material = require('../models/Repair_Detail_Material');
const Repair_Detail_Wage = require('../models/Repair_Detail_Wage');
const Repair_Detail_Employee = require('../models/Repair_Detail_Employee');
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
                return Repair_Detail_Material.find({ of_repair: data.repair._id })
                    .then((detail_Materials) => {
                        return Repair_Detail_Wage.find({ of_repair: data.repair._id })
                            .then((detail_Wages) => {
                                return Repair_Detail_Employee.find({ of_repair: data.repair._id })
                                    .then((detail_Employees) => {
                                        return {
                                            detail_Materials: detail_Materials,
                                            detail_Wages : detail_Wages,
                                            detail_Employees : detail_Employees,
                                            repair : data.repair,
                                            materials : data.materials,
                                            employees : data.employees,
                                            wages : data.wages,
                                        }
                                    })
                            })
                        
                    })
                
            })
            .then((data) => {
                res.render('repairs/repair-detail', {
                    Detail_Materials: mutipleMongooseToObject(data.detail_Materials),
                    Detail_Wages: mutipleMongooseToObject(data.detail_Wages),
                    Detail_Employees: mutipleMongooseToObject(data.detail_Employees),
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
        var repairDetailMaterial = new Repair_Detail_Material(req.body)
        repairDetailMaterial.of_repair = req.params.id
        repairDetailMaterial.material = req.params.materialId
        repairDetailMaterial.save()
            .then(() => {
                res.redirect('back')
            })  
            .catch(next) 
    }
    createWage(req, res, next) {
        var repairDetailWage = new Repair_Detail_Wage(req.body)
        repairDetailWage.of_repair = req.params.id
        repairDetailWage.wage = req.params.wageId
        repairDetailWage.save()
            .then(() => {
                res.redirect('back')
            })  
            .catch(next) 
    }
    createEmployee(req, res, next) {
        var repairDetailEmployee = new Repair_Detail_Employee(req.body)
        repairDetailEmployee.of_repair = req.params.id
        repairDetailEmployee.employee = req.params.employeeId
        repairDetailEmployee.save()
            .then(() => {
                res.redirect('back')
            })  
            .catch(next) 
    }
}
module.exports = new RepairController;