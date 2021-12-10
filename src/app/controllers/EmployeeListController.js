const Employee = require('../models/Employee')
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
                Employee.find({})
                    .then((employee)=> {
                        Tag.find({})
                        .then((tag) =>{
                            res.render('employeeList/index', {
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
                res.redirect('/employeeList')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }
    edit(req,res,next){
        Employee.updateOne({_id: req.params.id} , req.body)
            .then(()=> {
                res.redirect('/employeeList')
            })
            .catch(next)
    }
    delete(req,res,next){
        const idDelete = req.params.id
        Employee.delete({_id:idDelete})
            .then(()=> {
                res.redirect('/employeeList')
            }) 
            .catch(next)
    } 
    
}



module.exports = new EmployeeListController;