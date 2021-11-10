const Brand = require('../models/Brand')
const { mutipleMongooseToObject } = require('../../util/mongoose')
const { render } = require('node-sass')

class BrandController {
    // Nhiều hàm điều khiển
    // Thêm Xóa Sửa hiệu xe
    show(req,res,next) {// request , respond , next
        res.render('brand/brand')
    } 
    create(req,res,next){
        const newBrand = new Brand(req.body)
        newBrand.save()
            .then(() => {
                res.redirect('/brand')
            }) // Khi thành công 
            .catch(next) // Khi thất bại
    }

}



module.exports = new BrandController;