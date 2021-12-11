const Brand = require('../models/Brand')
const Position = require('../models/Position')
const Reception = require('../models/Reception')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToOject } = require('../../util/mongoose')
const { render } = require('node-sass')

class BrandController {
    // Nhiều hàm điều khiển
    // Thêm Xóa Sửa hiệu xe
    
    show(req, res, next) {
        Position.findOne({ _id: res.locals.employee.position })
            .then((position) => {
                return position
            })
            .then((position) => {
                Reception.find({})
                    .then((receptions) => {
                        
                        Brand.find({})
                            .then((brands) => {
                                
                                var data = []
                                for (var brand of brands) {
                                    var check = false
                                    for (var reception of receptions) {
                                        if (reception.brand.toString() == brand._id.toString()) {
                                            check = true
                                            break
                                        }
                                    }
                                    if (check) {
                                        data.push({brand: mongooseToOject(brand),canDelete: false})
                                    }
                                    else {
                                        data.push({brand: mongooseToOject(brand),canDelete: true})
                                    }
                                }
                                
                                for (const iterator of data) {
                                    iterator.brand.stringify = JSON.stringify(iterator.brand);
                                }
                                res.render('brand/brand', {
                                    Brand: mutipleMongooseToObject(brands),
                                    Data: data,
                                    activeManagementCar: true,
                                    activeBrand: true,
                                    Permissions: mongooseToOject(position.permissions),
                                    User: mongooseToOject(res.locals.employee)
                                })
                        })
                        .catch(next)
                    })
            })
        
    } 
    create(req,res,next){
        const newBrand = new Brand(req.body)
        newBrand.save()
            .then(() => {
                res.redirect('back')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }
    delete(req,res,next){
        const idDelete = req.params.id
        Brand.delete({_id:idDelete})
            .then(()=> {
                res.redirect('back',301)
            }) 
            .catch()
    }   
    edit(req,res,next){
        Brand.updateOne({_id: req.params.id} , req.body)
            .then(()=> {
                res.redirect('back')
            })
            .catch(next)
    }  
}



module.exports = new BrandController;