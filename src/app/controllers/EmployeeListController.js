const Employee = require('../models/Employee')
const Account = require('../models/Account')
const Error = require('../models/ManagermentError')
const DateOff = require('../models/EmployeeManagerment')
const Tag = require('../models/Position')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')
const { render } = require('node-sass')

class EmployeeListController {
    show(req,res,next) {// request , respond , next
        Tag.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => { 
                Employee.find({}).populate({path:'position'})
                    .then((employee)=> {
                       
                        Tag.find({})
                        .then((tag) =>{
                            var data = []
                            var userID = res.locals.employee._id
                            for (var item of employee){
                                if (item.position.isAdmin == "false")
                                data.push({item:mongooseToOject(item),userID})
                            }
                            res.render('employeeList/index', {
                                data,
                                employee: mutipleMongooseToObject(employee),
                                tag: mutipleMongooseToObject(tag),
                                activeEmployee: true,
                                activeList: true,
                                Permissions: mongooseToOject(position.permissions),
                                User: mongooseToOject(res.locals.employee)
                        }
                        )
                        })
                    })
                    .catch(next)
            })
        
    };

    create(req,res,next){
        const newEmployeeManagerment = new Employee(req.body)
        newEmployeeManagerment.save()
            .then(() => {
                res.redirect('back')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }
    edit(req,res,next){
        Employee.updateOne({_id: req.params.id} , req.body)
            .then(()=> {
                res.redirect('back')
            })
            .catch(next)
    }
    delete(req,res,next){
        const idDelete = req.params.id
        DateOff.delete({employeeID:idDelete})
            .then(()=>{
                Error.delete({employeeID:idDelete})
                    .then(() =>{
                        Account.delete({of_employee:idDelete})
                            .then(() =>{
                                Employee.delete({_id:idDelete})
                                .then(()=> {
                                    res.redirect('back')
                                }) 
                                .catch(next)
                            })
                    })
                
            })
       
    } 
    
}



module.exports = new EmployeeListController;