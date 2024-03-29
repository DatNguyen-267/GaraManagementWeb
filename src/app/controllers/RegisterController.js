const Employee = require('../models/Employee')
const Account = require('../models/Account')
const DateOff = require('../models/EmployeeManagerment')
const Tag = require('../models/Position')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')
const { render } = require('node-sass')
const passwordHash = require('password-hash')

class RegisterController {
    show(req,res,next) {// request , respond , next
        Tag.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => { 
                Account.find({})
                    .then((account)=> { 
                        Employee.find({}).populate({path:'position'}) 
                        .then((employees) =>{
                            var data = [];
                            var noAccounts = [];
                            for (var item of account){
                                for (var employee of employees){
                                    if (item.of_employee.toString() == employee._id.toString() && employee.position.isAdmin == "false"){
                                        data.push({item:mongooseToOject(item),employee:mongooseToOject(employee)})
                                    }
                                }
                            }
                            for (var employee of employees){
                                if (employee.haveAccount == "false" && employee.position.isAdmin == "false"){
                                    noAccounts.push({employee:mongooseToOject(employee)})
                                }
                            }
                            res.render('register/index', {
                                noAccounts,
                                data,
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
        var newAccount = new Account(req.body)
        newAccount.password = passwordHash.generate(req.body.password);
        Employee.updateOne({_id: req.body.of_employee},{$set:{haveAccount:"true"}})
            .then(()=>{
                newAccount.save()
            .then(() => {
                res.redirect('back')
            }) // Khi thành công 
            .catch(next) 
            })
        // Khi thất bại*/
    }
    delete(req,res,next){
        const idDelete = req.params.id
        //res.send(req.params.id)
        Employee.updateOne({_id: req.body.of_employee},{$set:{haveAccount:"false"}})
            .then(()=>{
                Account.delete({_id:idDelete})
                .then(()=> {
                    res.redirect('back')
                }) 
                .catch(next)
            })
    } 
    
}



module.exports = new RegisterController;