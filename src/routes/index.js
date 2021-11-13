const newsRouter = require('./news')
const siteRouter = require('./site')
const coursesRouter = require('./courses')
const meRouter = require('./me')
const receptionRouter = require('./reception')
const brandRouter = require('./brand')
const repairRouter = require('./repairs')


function route(app) {
      app.use('/news', newsRouter)

      app.use('/courses', coursesRouter)

      app.use('/me', meRouter)

      app.use('/reception', receptionRouter)
      
      app.use('/repairs', repairRouter)

      app.use('/brand', brandRouter)

      app.use('/', siteRouter)

      // app.post('/search', (req,res) => {
      //   console.log(req.body)
      //   res.send('')
      // })
}

module.exports = route;