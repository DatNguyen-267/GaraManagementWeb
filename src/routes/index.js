const newsRouter = require('./news')
const siteRouter = require('./site')
const coursesRouter = require('./courses')
const meRouter = require('./me')
const receptionRouter = require('./reception')
const repairRouter = require('./repairs')
const employeeListRouter = require('./employeeList')
const employeeTagRouter = require('./employeeTag')
const employeeSalaryRouter = require('./employeeSalary')
const employeeManagermentRouter = require('./employeeManagerment')


function route(app) {
      app.use('/news', newsRouter)

      app.use('/courses', coursesRouter)

      app.use('/me', meRouter)

      app.use('/reception', receptionRouter)
      
      app.use('/repairs', repairRouter)

      app.use('/employeeList', employeeListRouter)

      app.use('/employeeTag', employeeTagRouter)
      
      app.use('/employeeSalary', employeeSalaryRouter)

      app.use('/employeeManagerment', employeeManagermentRouter)
      
      app.use('/', siteRouter)

      

      // app.post('/search', (req,res) => {
      //   console.log(req.body)
      //   res.send('')
      // })
}

module.exports = route;