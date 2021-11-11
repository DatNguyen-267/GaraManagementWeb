const Brand = require('../models/Brand')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')

class BrandController {
    // Nhiều hàm điều khiển
    // Thêm Xóa Sửa hiệu xe
    show(req,res,next) {// request , respond , next
        Brand.find({})
            .then((brands)=> {
                res.render('brand/brand', {
                    brands: mutipleMongooseToObject(brands),
                })
            })
            .catch(next)
    } 
    create(req,res,next){
        const newBrand = new Brand(req.body)
        newBrand.save()
            .then(() => {
                res.redirect('/brand')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }
    delete(req,res,next){
        const idDelete = req.params.id
        Brand.delete({_id:idDelete})
            .then(()=> {
                res.redirect('/brand')
            }) 
            .catch()
    }   

}



module.exports = new BrandController;