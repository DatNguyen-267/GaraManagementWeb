const Customer = require('../models/Customer.js')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')
class CustomerController {
    show(req,res,next) {
        Customer.find({})
            .then(customers => {
                res.render('customer/customer', {
                    customers: mutipleMongooseToObject(customers)})
            }) 
            .catch(next)
        
    }
    showdebt(req,res,next) {
        Customer.find({})
            .then(customers => {
                res.render('customer/customer-debt', {
                    customers: mutipleMongooseToObject(customers)})
            }) 
            .catch(next)
    }
    create(req,res,next){
        const customer = new Customer(req.body)
        customer.save()
            .then(()=> {
                res.redirect('/customer')
            })
            .catch(next)
    }
    edit(req,res,next){
        Customer.updateOne({_id:req.params.id}, req.body)
            .then(() => res.redirect('/customer'))
            .catch(next)
    }
    delete(req,res,next){
        Customer.delete({_id: req.params.id})
            .then(()=> {
                res.redirect('/customer')
            })
            .catch(next)
    }
}
module.exports = new CustomerController;