const Reception = require('../models/Reception')
const Customer =require('../models/Customer')
const Brand = require('../models/Brand')
const Bill = require('../models/Bill')
const Debt = require('../models/Debt')
const Repair = require('../models/Repair')
const Repair_Detail_Material = require('../models/Repair_Detail_Material')
const Repair_Detail_Wage = require('../models/Repair_Detail_Wage')
const Repair_Detail_Employee = require('../models/Repair_Detail_Employee')
const Material = require('../models/Material')
const Employee = require('../models/Employee')
const Wage = require('../models/Wage')

const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')

const { render } = require('node-sass')
const Position = require('../models/Position')
class ReceptionController {
    show(req, res, next) {
        // res.send(res.locals.test)
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => {
                Promise.all([
                Reception.find({}).populate('of_customer').populate('brand').populate('of_repair'), Customer.find({}) , Brand.find({})])
                .then(([receptions, customers, brands]) => {
                    res.render('receptions/reception', {
                        Receptions: mutipleMongooseToObject(receptions),
                        Customers: mutipleMongooseToObject(customers),
                        Brands: mutipleMongooseToObject(brands),
                        activeManagementCar: true,
                        activeReception: true,
                        Permissions: mongooseToOject(position.permissions),
                        User: mongooseToOject(res.locals.employee)
                    })  
                })
                .catch(next)
        })
        
    }
    create(req, res, next) {
        
        if (req.body.isNewCustomer == 'on') {
            var newCustomer = new Customer()
            newCustomer.name = req.body.name
            newCustomer.cardIdentify = req.body.cardIdentify
            newCustomer.address = req.body.address
            newCustomer.phone = req.body.phone
            newCustomer.email = req.body.email
            newCustomer.birthday = req.body.birthday
            newCustomer.save()
                .then(() => {
                var newReception = new Reception(req.body)
                newReception.status = 'Mới'
                newReception.license = req.body.license
                newReception.phone = req.body.phone
                newReception.of_customer = newCustomer._id
                    newReception.brand = req.body.brand

                newReception.save()
                    .then(() => {
                        Customer.findOne({ _id: newCustomer._id })
                            .then((customer) => {
                                customer.of_reception.push(newReception._id)
                                Customer.updateOne({ _id: newCustomer },{
                                    of_reception: customer.of_reception
                                })
                                    .then(() => {
                                    res.redirect('/reception')
                                }).catch(next)
                        }).catch(next)
                    }).catch(next)
            }).catch(next)
            
        }
        else {
            const reception = new Reception(req.body)
            reception.status = 'Mới'
            reception.license = req.body.license
            reception.phone = req.body.phone
            reception.of_customer = req.body.oldCustomer
            reception.brand = req.body.brand
            reception.save()
            .then(() => {
                Customer.findOne({ _id: req.body.oldCustomer })
                    .then((customer) => {
                        customer.of_reception.push(reception)
                        Customer.updateOne({ _id: req.body.oldCustomer }, {
                            of_reception: customer.of_reception
                        })
                            .then(() => {
                            res.redirect('/reception')
                        }).catch(next)
                }).catch(next)
            })
            .catch(next)
            
            

        }
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
    showPay(req, res, next) {
        var now = new Date()
        now = now.toLocaleString()
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => {
                Promise.all([
                    Reception.findOne({ _id: req.params.id }).populate('of_customer'),
                    Repair.findOne({of_reception: req.params.id})
                ])
                    .then(([reception, repair]) => {
                        Promise.all([
                            Repair_Detail_Material.find({of_repair: repair._id}),
                            Repair_Detail_Wage.find({of_repair: repair._id})
                        ])
                            .then(([detailMaterial, detailWage]) => {
                                res.render('receptions/pay', {
                                    Reception: mongooseToOject(reception),
                                    DetailMaterial: mutipleMongooseToObject(detailMaterial),
                                    DetailWage: mutipleMongooseToObject(detailWage),
                                    Now: now,
                                    activeManagementCar: true,
                                    activeReception: true,
                                    Rules: mongooseToOject(position.rules),
                                    User: mongooseToOject( res.locals.employee)
                                })
                            })
                            .catch(next)
                    })
                    .catch(next)
            })
        
    }
    createBill(req, res, next) {
        
        var newBill = new Bill()
        Reception.findOne({ _id: req.params.id })
            .then((reception) => {
                
                newBill.of_reception = req.params.id
                newBill.money_pay = reception.total_money
                newBill.save()
                    .then(() => {
                        Reception.updateOne({ _id: req.params.id }, {
                            isSuccess: true,
                            status: "Hoàn thành",
                            debt: 0,
                        })
                        .then(() => {
                            res.redirect('/reception')
                        })
                        .catch(next)
                    })
                    .catch(next)
            })
            .catch(next)
    }
    showDebt(req, res, next) {
        var now = new Date()
        now = now.toLocaleString()
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => { 
                Promise.all([
                    Reception.findOne({ _id: req.params.id }).populate('of_customer'),
                    Repair.findOne({of_reception: req.params.id})
                ])
                    .then(([reception, repair]) => {
                        Promise.all([
                            Repair_Detail_Material.find({of_repair: repair._id}),
                            Repair_Detail_Wage.find({of_repair: repair._id})
                        ])
                            .then(([detailMaterial, detailWage]) => {
                                res.render('receptions/debt', {
                                    Reception: mongooseToOject(reception),
                                    DetailMaterial: mutipleMongooseToObject(detailMaterial),
                                    DetailWage: mutipleMongooseToObject(detailWage),
                                    Now: now,
                                    activeManagementCar: true,
                                    activeReception: true,
                                    Rules: mongooseToOject(position.rules),
                                    User: mongooseToOject( res.locals.employee)
                                })
                            })
                            .catch(next)
                    })
                    .catch(next)
            })
        
    }
    createDebt(req, res, next) {
        var newDebt = new Debt(req.body)
        Reception.findOne({ _id: req.params.id })
            .then((reception) => {
                newDebt.of_reception = req.params.id
                newDebt.money_pay = Number.parseInt(req.body.money_pay)
                newDebt.save()
                    .then(() => {
                        var debt = reception.total_money - Number.parseInt(req.body.money_pay)
                        Reception.updateOne({ _id: req.params.id }, {
                            isDebt: true,
                            status: "Nợ",
                            debt: debt,
                        })
                        .then(() => {
                            res.redirect('/reception')
                        })
                        .catch(next)
                    })
                    .catch(next)
            })
            .catch(next)
    }
}
module.exports = new ReceptionController;