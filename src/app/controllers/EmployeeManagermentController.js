const Error = require('../models/ManagermentError')
const DateOff = require('../models/EmployeeManagerment')
const Employee = require('../models/Employee')
const Rule = require('../models/Rule');
const Tag = require('../models/Position');

const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')
const { mongooseToOject } = require('../../util/mongoose')
class EmployeeManagermentController {
    show(req, res, next) {// request , respond , next
        Tag.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => { 
                Employee.find({}).populate({path:'position'})
                .then((employees)=> {
                    Error.find({})
                        .then((errors) =>{
                            DateOff.find({})
                                .then((dateoffs) =>{
                                    var data = [];
                                    for (var employee of employees){
                                        if (employee.position.isAdmin == "false")
                                        {
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
                                        
                                    }
                                    res.render('employeeManagerment/index', {
                                        data,
                                        activeEmployee: true,
                                        activeManager: true,
                                        Permissions: mongooseToOject(position.permissions),
                                        User: mongooseToOject(res.locals.employee)
                            })
                        })
                    
                    })
                })
                .catch(next)
            })
        
    };

    infoShow(req,res,next) {// request , respond , next
        const id = req.params.id;
        Tag.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => { 
                Employee.findOne({_id: id})
                    .then((employee)=> {
                        Error.find({employeeID: id})
                            .then((error) =>{
                                DateOff.find({employeeID: id})
                                    .then((dateoff) =>{
                                        Rule.find()
                                            .then((rule) =>{
                                                //res.send(rule)
                                                
                                        res.render('employeeManagerment/info', {
                                            employee: mongooseToOject(employee),
                                            dateoff: mutipleMongooseToObject(dateoff),
                                            error: mutipleMongooseToObject(error),
                                            rule: mutipleMongooseToObject(rule),
                                            activeEmployee: true,
                                            activeManager: true,
                                            Permissions: mongooseToOject(position.permissions),
                                            User: mongooseToOject(res.locals.employee)
                                    }
                                    )
                                })
                            })
                        
                        })
                    })
                    .catch(next)
            })
        
    };

    createDateoff(req,res,next){
        const newDate = new DateOff(req.body)
        const id = req.body.eID;
        newDate.save()
            .then(() => {
                res.redirect('back')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    editDateoff(req,res,next){
        const id = req.body.eID;
        DateOff.updateOne({_id: req.params.id} , req.body)
            .then(()=> {
                res.redirect('back')
            })
            .catch(next)
    }
    deleteDayoff(req,res,next){
        const id = req.body.eID;
        const idDelete = req.params.id
        DateOff.delete({_id:idDelete})
            .then(()=> {
                res.redirect('back')
            }) 
            .catch(next)
    }

    createError(req,res,next){
        const newError = new Error(req.body)
        const id = req.body.eID;
        newError.save()
            .then(() => {
                res.redirect('back')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    editError(req,res,next){
        const id = req.body.eID;
        Error.updateOne({_id: req.params.id} , req.body)
            .then(()=> {
                res.redirect('back')
            })
            .catch(next)
    }
    deleteError(req,res,next){
        const id = req.body.eID;
        const idDelete = req.params.id
        Error.delete({_id:idDelete})
            .then(()=> {
                res.redirect('back')
            }) 
            .catch(next)
    }
}



module.exports = new EmployeeManagermentController;