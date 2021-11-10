const Course = require('../models/Course')
const { mutipleMongooseToObject } = require('../../util/mongoose')
class SiteController {

    // [GET] /
    home(req, res, next) {

        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: mutipleMongooseToObject(courses),})
            })
            .catch(next)

          // res.render('home')
    }

    // [GET] /search
    search(req,res) {
        res.render('search')
    }
}

module.exports = new SiteController;