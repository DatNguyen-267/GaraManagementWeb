const Tag = require('../models/Position')
const Employee = require('../models/Employee')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')
const { render } = require('node-sass')

class EmployeeTagController {
    show(req, res, next) {// request , respond , next
        Tag.findOne({ _id: res.locals.employee.position })
            .then((position) => {
            return position
            })
            .then((position) => {
                Tag.find({})
                    .then((tag)=> {
                        Employee.find({})
                            .then((employee) =>{
                                var data = [];
                                for (var item of tag){
                                    var flat = "true"
                                    var count = 0;
                                    for (var temp of employee){
                                        if (item._id.toString() == temp.position)
                                        {
                                            count++;
                                            flat = "false";
                                        }
                                    
                                    }
                                    data.push({item:mongooseToOject(item),flat,count})
                                }
                                    res.render('employeeTag/index', {
                                        tag: mutipleMongooseToObject(tag),
                                        activeEmployee: true,
                                        activeTag: true,
                                        Permissions: mongooseToOject(position.permissions),
                                        User: mongooseToOject(res.locals.employee),
                                        data
                                    })
                                })
                                .catch(next)
                                })
            })
        
    };

    create(req,res,next){
        const newTag = new Tag(req.body)
        newTag.save()
            .then(() => {
                res.redirect('back')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

    edit(req,res,next){
        //res.send(req.params.id)
        Employee.updateMany({position:req.params.id},
            {$set:{Tag:req.body.name,salary:req.body.salary,percent:req.body.percent}})
            .then(()=>{
                Tag.updateOne({_id: req.params.id} , req.body)
                    .then(()=> {
                        res.redirect('back')
                    })
                    .catch(next)
            })
        
    }
    delete(req,res,next){
        
        const idDelete = req.params.id
        Tag.delete({_id:idDelete})
                        .then(()=> {
                            res.redirect('back')
                        })
                        .catch(next)
            
    } 
}



module.exports = new EmployeeTagController;