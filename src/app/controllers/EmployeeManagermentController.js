const Error = require('../models/ManagermentError')
const DateOff = require('../models/EmployeeManagerment')
const Employee = require('../models/EmployeeList')
const Rule =  require('../models/Rule');
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')
const { mongooseToOject } = require('../../util/mongoose')
class EmployeeManagermentController {
    show(req,res,next) {// request , respond , next
        Employee.find({})
            .then((employees)=> {
                Error.find({})
                    .then((errors) =>{
                        DateOff.find({})
                            .then((dateoffs) =>{
                                var data = [];
                                for (var employee of employees){
                                    var errorCount =0
                                    var dateoffCount = 0;
                                    for (var error of errors){
                                        if (employee._id == error.employeeID){
                                            errorCount++;
                                        }
                                    }
                                    for (var date of dateoffs){
                                        if (employee._id == date.employeeID){
                                            dateoffCount++;
                                        }
                                    }
                                    data.push({employee: mongooseToOject(employee),errorCount,dateoffCount})
                                }
                                res.render('employeeManagerment/index', {
                                    data,
                                    activeEmployee: true,
                                    activeManager:true
                        })
                    })
                
                })
            })
            .catch(next)
    };

    infoShow(req,res,next) {// request , respond , next
        const id = req.params.id;
        Employee.findOne({_id: id})
            .then((employee)=> {
                Error.find({employeeID: id})
                    .then((error) =>{
                        DateOff.find({employeeID: id})
                            .then((dateoff) =>{
                                Rule.find({employeeID: id})
                                    .then((rule) =>{
                                        //res.send(rule)
                                res.render('employeeManagerment/info', {
                                    employee: mongooseToOject(employee),
                                    dateoff: mutipleMongooseToObject(dateoff),
                                    error: mutipleMongooseToObject(error),
                                    rule: mutipleMongooseToObject(rule),
                                    activeEmployee: true,
                                    activeManager:true
                            }
                            )
                        })
                    })
                
                })
            })
            .catch(next)
    };

    createDateoff(req,res,next){
        const newDate = new DateOff(req.body)
        const id = req.body.eID;
        newDate.save()
            .then(() => {
                res.redirect('/employeeManagerment/' + id + '/info')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    editDateoff(req,res,next){
        const id = req.body.eID;
        DateOff.updateOne({_id: req.params.id} , req.body)
            .then(()=> {
                res.redirect('/employeeManagerment/' + id + '/info')
            })
            .catch(next)
    }
    deleteDayoff(req,res,next){
        const id = req.body.eID;
        const idDelete = req.params.id
        DateOff.delete({_id:idDelete})
            .then(()=> {
                res.redirect('/employeeManagerment/' + id + '/info')
            }) 
            .catch(next)
    }

    createError(req,res,next){
        const newError = new Error(req.body)
        const id = req.body.eID;
        newError.save()
            .then(() => {
                res.redirect('/employeeManagerment/' + id + '/info')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    editError(req,res,next){
        const id = req.body.eID;
        Error.updateOne({_id: req.params.id} , req.body)
            .then(()=> {
                res.redirect('/employeeManagerment/' + id + '/info')
            })
            .catch(next)
    }
    deleteError(req,res,next){
        const id = req.body.eID;
        const idDelete = req.params.id
        Error.delete({_id:idDelete})
            .then(()=> {
                res.redirect('/employeeManagerment/' + id + '/info')
            }) 
            .catch(next)
    }
}



module.exports = new EmployeeManagermentController;