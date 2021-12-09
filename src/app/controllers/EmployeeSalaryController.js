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
                    .then((error) =>{
                        var data = []
                        for (var item of employee){
                            var fineSum = 0;
                            for(var temp of error){
                                
                                if (item._id == temp.employeeID){
                                    var n = temp.fine;
                                    n = n.replaceAll('.','')
                                    n = n.replace('₫','')
                                    fineSum += parseInt(n);

                                }
                            }
                            var formatter = new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                            });
                            fineSum = formatter.format(fineSum.toString());
                            data.push({item:mongooseToOject(item),fineSum})
                        }
                        //res.send(data)
                        res.render('employeeSalary/index', {
                            employee: mutipleMongooseToObject(employee),
                            data,
                            activeEmployee: true,
                            activeSalary:true
                        })
                    })
            })
            .catch(next)
    };

    create(req,res,next){
        const newSalaryInfo = new SalaryInfo(req.body)
        newSalaryInfo.save()
            .then(() => {
                res.redirect('/employeeSalary')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    edit(req,res,next){
        res.send(req.body)
        /*SalaryInfo.updateOne({ID: req.params.id} , req.body)
            .then(()=> {
                res.redirect('/employeeSalary')
            })
            .catch(next)*/
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