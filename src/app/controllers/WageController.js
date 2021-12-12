const Wage = require('../models/Wage.js')
const Reception = require('../models/Reception.js')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')
const { render, NULL } = require('node-sass')
const { SchemaTypes } = require('mongoose')
const Position = require('../models/Position')
const Repair_Detail_Wage = require('../models/Repair_Detail_Wage.js')

class WageController {
    show(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
             .then((position) => {
             return position
             })
             .then((position) => { 
                Promise.all([
                    Wage.find({}), Repair_Detail_Wage.find({})])
                        .then(([wages, repair_detail_wages]) => {
                            for (const wage of wages) {
                                var id_wage = wage._id.toString()
                                for(const iteam of repair_detail_wages){
                                    var id = iteam.wage._id.toString()
                                    if(id == id_wage){
                                        wage.not_delete = true
                                        wage.not_edit = true
                                    }
                                }
                            }
                            res.render('wage/wage', {
                                wages: mutipleMongooseToObject(wages),
                                activeManagementCar: true,
                                activeWage: true,
                                Permissions: mongooseToOject(position.permissions),
                                User: mongooseToOject(res.locals.employee)
                            })
                    })
                    .catch(next)
            })
    }

    create(req, res, next) {
        var check = 0
        const wage = new Wage(req.body)
        Wage.find({})
        .then(wages => {
            for (const iteam of wages) {
                if( iteam.name == wage.name && iteam._id !=req.params.id)
                {
                    check = 1
                }
            }
            if(check == 1){
               res.render('wage/wage', {
                    wages: mutipleMongooseToObject(wages),
                    activeManagementCar: true,
                    activeWage: true,
                    check,
                })
            }
            else{
                wage.save()
                .then(() => {
                    res.redirect('back')

                })
                .catch(next)
            }
        })
        .catch(next)
        
    }
    edit(req, res, next) {
        var check = 0
        const wage = new Wage(req.body)
        Wage.find({})
        .then(wages => {
            for (const iteam of wages) {
                if( iteam.name == wage.name && iteam._id !=req.params.id)
                {
                    check = 2
                }
            }
            if(check == 2){
               res.render('wage/wage', {
                    wages: mutipleMongooseToObject(wages),
                    activeManagementCar: true,
                    activeWage: true,
                    check,
                })
            }
            else{
                Wage.updateOne({ _id: req.params.id }, req.body)
                .then(() => res.redirect('back'))
                .catch(next)
            }
        })
        .catch(next)
        
    }
    delete(req, res, next) {
        Wage.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

}
module.exports = new WageController;