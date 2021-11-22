const Tag = require('../models/EmployeeTag')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')

class EmployeeTagController {
    show(req,res,next) {// request , respond , next
        Tag.find({})
            .then((tag)=> {
                res.render('employeeTag/index', {
                    tag: mutipleMongooseToObject(tag),
                })
            })
            .catch(next)
    };

    create(req,res,next){
        const newTag = new Tag(req.body)
        newTag.save()
            .then(() => {
                res.redirect('/employeeList')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    edit(req,res,next){
        Tag.updateOne({ID: req.params.id} , req.body)
            .then(()=> {
                res.redirect('/employeeList')
            })
            .catch(next)
    }
    delete(req,res,next){
        const idDelete = req.params.id
        Tag.delete({ID:idDelete})
            .then(()=> {
                res.redirect('/employeeList')
            }) 
            .catch(next)
    } 
}



module.exports = new EmployeeTagController;