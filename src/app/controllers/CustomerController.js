const Customer = require('../models/Customer.js')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')
const { render, NULL } = require('node-sass')
const { SchemaTypes } = require('mongoose')
const Position = require('../models/Position')

class CustomerController {
    show(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => { 
                Customer.find({})
                .then(customers => {
                    res.render('customer/customer', {
                        customers: mutipleMongooseToObject(customers),
                        activeManagementCustomer: true,
                        activeCustomer: true,
                        Permissions: mongooseToOject(position.permissions),
                        User: mongooseToOject(res.locals.employee)
                    })
                })
                .catch(next)
            })
        

    }

    create(req, res, next) {
        const customer = new Customer(req.body)
        customer.save()
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }
    edit(req, res, next) {
        Customer.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/customer'))
            .catch(next)
    }
    delete(req, res, next) {
        Customer.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('/customer')
            })
            .catch(next)
    }

    //-----------Debt-------------//
    showdebt(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => { 
                Customer.find({}).populate('of_reception', ['name', 'debt'])
                    .then(customers => {
                        for (const customer of customers) {
                            var totaldebt = 0
                            for (const reception of customer.of_reception) {
                                totaldebt = reception.debt + totaldebt
                            }
                            customer.debt = totaldebt
                        }
                        var listdebt = []
                        for (const customer of customers) {
                            if (customer.debt > 0) {
                                listdebt.push(customer)
                            }
                        }
                        res.render('customer/customer-debt', {
                            listdebt: mutipleMongooseToObject(listdebt),
                            activeManagementCustomer: true,
                            activeCustomerDebt: true,
                            Permissions: mongooseToOject(position.permissions),
                            User: mongooseToOject(res.locals.employee)
                        })
                    })
                    .catch(next)
            })
        
    }
    customerDebtDetail(req, res, next) {
        
        Customer.find({ _id: req.params.id }).populate('of_reception')
            .then(customers => {
                var listreception = []
                for (const customer of customers) {
                    for (const reception of customer.of_reception) {
                        if (reception.debt > 0) {
                            listreception.push(reception)
                        }

                    }
                }
                res.render('customer/customer-debt-detail', {
                    listreception: mutipleMongooseToObject(listreception),
                    activeManagementCustomer: true,
                    activeCustomerDebt: true,
                })
            })
            .catch(next)
    }

    //----------History--------//
    showhistory(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => { 
                Customer.find({}).populate('of_reception', ['name', 'debt'])
                    .then(customers => {
                        for (const customer of customers) {
                            var totaldebt = 0
                            var number_of_reception = 0
                            for (const reception of customer.of_reception) {
                                totaldebt = reception.debt + totaldebt
                                number_of_reception = number_of_reception +1
                            }
                            customer.debt = totaldebt
                            customer.number_of_reception = number_of_reception
                        }
                        var listhistory = []
                        for (const customer of customers) {

                            listhistory.push(customer)

                        }
                        
                        res.render('customer/customer-history', {
                            listhistory: mutipleMongooseToObject(listhistory),
                            activeManagementCustomer: true,
                            activeCustomerHistory: true,
                            Permissions: mongooseToOject(position.permissions),
                            User: mongooseToOject(res.locals.employee)
                        })
                    })
                    .catch(next)
            })
    }
    customerHistoryDetail(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => { 
                Customer.find({ _id: req.params.id }).populate('of_reception')
                .then(customers => {
                    var listreception = []
                    for (const customer of customers) {
                        for (const reception of customer.of_reception) {
                            listreception.push(reception)

                        }
                    }
                    res.render('customer/customer-history-detail', {
                        listreception: mutipleMongooseToObject(listreception),
                        activeManagementCustomer: true,
                        activeCustomerHistory: true,
                        Permissions: mongooseToOject(position.permissions),
                        User: mongooseToOject(res.locals.employee)
                    })
                })
                .catch(next)
            })
        
    }

}
module.exports = new CustomerController;