const Course = require('../models/Course')
const {mongooseToOject} = require('../../util/mongoose')
class CoursesController {

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug :req.params.slug})
            .then((course) => 
                res.render('courses/show', {
                    course: mongooseToOject(course)})
            )
            .catch(next)
        // res.send(req.params.slug)
    }
    create(req, res, next){
        res.render('courses/create')
    }

    store(req, res, next){
        const formData = req.body
        formData.image = `http://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg`
        const course = new Course(formData)
        course.save()
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(error => {})
      
    }
    edit(req, res, next){
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToOject(course),
            }))
            .catch(next)
    }
    update(req, res, next){
        Course.updateOne({_id:req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }
    delete(req, res, next){
        Course.delete({_id:req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    restore(req, res, next){
        Course.restore({_id:req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
    forceDelete(req, res, next){
        Course.deleteOne({_id:req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
}

module.exports = new CoursesController();