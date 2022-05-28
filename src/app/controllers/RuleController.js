const Rule = require('../models/Rule')
const Tag = require('../models/Position')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')
const { render } = require('node-sass')
const Employee = require('../models/Employee')
class RuleController {
    show(req,res,next) {// request , respond , next
        Employee.findOne({_id: req.user.of_employee})
            .then((employee) =>{
                Tag.findOne({ _id: employee.position })
            .then((position) => {
            return position
            })
            .then((position) => { 
                Rule.find({})
                    .then((rule)=> {
                        res.render('Rules/index', {
                            rule: mutipleMongooseToObject(rule),
                            activeEmployee: true,
                            activeRule: true,
                            Permissions: mongooseToOject(position.permissions),
                            User: mongooseToOject(employee)
                    }
                    )
                    })
                })
                .catch(next)
            })
        
                        
        
    };

    create(req,res,next){
        const newRule = new Rule(req.body)
        newRule.save()
            .then(() => {
                res.redirect('back')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }
    edit(req,res,next){
        Rule.updateOne({_id: req.params.id} , req.body)
            .then(()=> {
                res.redirect('back')
            })
            .catch(next)
    }
    delete(req,res,next){
        const idDelete = req.params.id
        Rule.delete({_id:idDelete})
            .then(()=> {
                res.redirect('back')
            }) 
            .catch(next)
    } 
    
}



module.exports = new RuleController;