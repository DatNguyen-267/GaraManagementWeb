
const Employee = require('../models/Employee')
const Error = require('../models/ManagermentError')
const Tag = require('../models/Position')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')
const { mongooseToOject } = require('../../util/mongoose')
class EmployeeSalaryController {
    show(req, res, next) {// request , respond , next
        Tag.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => { 
                Employee.find({})
                    .then((employee)=> {
                        Error.find()
                            .then((error) =>{
                                var data = []
                                for (var item of employee){
                                    var sum = 0;
                                    for(var temp of error){
                                        
                                        if (item._id == temp.employeeID){
                                            var n = temp.fine;
                                            n = n.replaceAll('.','')
                                            n = n.replace('₫','')
                                            sum += parseInt(n);

                                        }
                                    }
                                    var formatter = new Intl.NumberFormat('vi-VN', {
                                        style: 'currency',
                                        currency: 'VND',
                                    });
                                    sum = formatter.format(sum.toString());
                                    data.push({item:mongooseToOject(item),sum})
                                }
                                //res.send(data)
                                res.render('employeeSalary/index', {
                                    employee: mutipleMongooseToObject(employee),
                                    data,
                                    activeEmployee: true,
                                    activeSalary: true,
                                    Permissions: mongooseToOject(position.permissions),
                                    User: mongooseToOject(res.locals.employee)
                                })
                            })
                    })
                    .catch(next)
        })
        
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