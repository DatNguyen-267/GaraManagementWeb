const EmployeeManagerment = require('../models/EmployeeManagerment')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')

class EmployeeManagermentController {
    show(req,res,next) {// request , respond , next
        EmployeeManagerment.find({})
            .then((employee)=> {
                res.render('employeeManagerment/index', {
                    employee: mutipleMongooseToObject(employee),
                })
            })
            .catch(next)
    };

    create(req,res,next){
        const newEmployeeManagerment = new Employee(req.body)
        newEmployeeManagerment.save()
            .then(() => {
                res.redirect('/employeeList')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    edit(req,res,next){
        EmployeeManagerment.updateOne({ID: req.params.id} , req.body)
            .then(()=> {
                res.redirect('/employeeList')
            })
            .catch(next)
    }
    delete(req,res,next){
        const idDelete = req.params.id
        EmployeeManagerment.delete({ID:idDelete})
            .then(()=> {
                res.redirect('/employeeList')
            }) 
            .catch(next)
    } 
}



module.exports = new EmployeeManagermentController;