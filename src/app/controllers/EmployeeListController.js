const Employee = require('../models/EmployeeList')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')

class EmployeeListController {
    show(req,res,next) {// request , respond , next
        Employee.find({})
            .then((employee)=> {
                res.render('employeeList/index', {
                    employee: mutipleMongooseToObject(employee),
                })
            })
            .catch(next)
    };

    create(req,res,next){
        const newEmployee = new Employee(req.body)
        newEmployee.save()
            .then(() => {
                res.redirect('/employeeList')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    edit(req,res,next){
        Employee.updateOne({ID: req.params.id} , req.body)
            .then(()=> {
                res.redirect('/employeeList')
            })
            .catch(next)
    }
    delete(req,res,next){
        const idDelete = req.params.id
        Employee.delete({ID:idDelete})
            .then(()=> {
                res.redirect('/employeeList')
            }) 
            .catch(next)
    } 
    
}



module.exports = new EmployeeListController;