const SalaryInfo = require('../models/EmployeeSalary')
const Employee = require('../models/EmployeeList')
const Error = require('../models/ManagermentError')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')
const { mongooseToOject } = require('../../util/mongoose')
class EmployeeSalaryController {
    show(req,res,next) {// request , respond , next
        Employee.find({})
            .then((employee)=> {
                Error.find()
                    .then((errorCount) =>{
                        res.render('employeeSalary/index', {
                            employee: mutipleMongooseToObject(employee),
                        })
                    })
            })
            .catch(next)
    };

    create(req,res,next){
        const newSalaryInfo = new Employee(req.body)
        newSalaryInfo.save()
            .then(() => {
                res.redirect('/employeeSalary')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    edit(req,res,next){
        SalaryInfo.updateOne({ID: req.params.id} , req.body)
            .then(()=> {
                res.redirect('/employeeSalary')
            })
            .catch(next)
    }
    delete(req,res,next){
        const idDelete = req.params.id
        SalaryInfo.delete({ID:idDelete})
            .then(()=> {
                res.redirect('/employeeSalary')
            }) 
            .catch(next)
    } 
}



module.exports = new EmployeeSalaryController;