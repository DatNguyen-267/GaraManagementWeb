const Employee = require('../models/Employee')
const Account = require('../models/Account')
const DateOff = require('../models/EmployeeManagerment')
const Tag = require('../models/Position')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')
const { render } = require('node-sass')

class RegisterController {
    show(req,res,next) {// request , respond , next
        Tag.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => { 
                Account.find({})
                    .then((account)=> {
                        Employee.find({})
                        .then((tag) =>{
                            res.render('register/index', {
                            activeEmployee: true,
                            activeAccountManager: true,
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
                        Employee.delete({_id:idDelete})
                            .then(()=> {
                                res.redirect('back')
                            }) 
                            .catch(next)
                    })
                
            })
       
    } 
    
}



module.exports = new RegisterController;