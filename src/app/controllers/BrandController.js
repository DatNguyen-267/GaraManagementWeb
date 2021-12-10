const Brand = require('../models/Brand')
const Position = require('../models/Position')
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
                Brand.find({})
                .then((brands)=> {
                    res.render('brand/brand', {
                        brands: mutipleMongooseToObject(brands),
                        activeManagementCar: true,
                        activeBrand: true,
                        Permissions: mongooseToOject(position.permissions),
                        User: mongooseToOject(res.locals.employee)
                    })
                })
                .catch(next)
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
                res.redirect('back')
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