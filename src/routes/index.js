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
const brandRouter = require('./brand')
const materialRouter = require('./material')
const customerRouter =require('./customer')
const customerdebtRouter =require('./customerdebt')
const supplierRouter = require('./supplier')
const importRouter = require('./import')
const exportRouter = require('./export')
const customerhistoryRouter =require('./customerhistory')
const reportsaleRouter =require('./reportsale')
const reportinventoryRouter =require('./reportinventory')
const loginRouter =require('./login')
const dashboardRouter =require('./dashboard')
const ruleRouter = require('./rules')




function route(app) {
      app.use('/:profile/news', newsRouter)

      app.use('/:profile/courses', coursesRouter)

      app.use('/:profile/me', meRouter)

      app.use('/:profile/reception', receptionRouter)
      
      app.use('/:profile/repairs', repairRouter)

      app.use('/:profile/employeeList', employeeListRouter)

      app.use('/:profile/employeeTag', employeeTagRouter)
      
      app.use('/:profile/employeeSalary', employeeSalaryRouter)

      app.use('/:profile/employeeManagerment', employeeManagermentRouter)

      app.use('/:profile/rules', ruleRouter)
      
      app.use('/:profile/customer', customerRouter)

      app.use('/:profile/customerdebt', customerdebtRouter)

      app.use('/:profile/customerhistory', customerhistoryRouter)

      app.use('/:profile/reportsale', reportsaleRouter)

      app.use('/:profile/reportinventory', reportinventoryRouter)

      app.use('/:profile/material', materialRouter)

      app.use('/:profile/supplier', supplierRouter)

      app.use('/:profile/import', importRouter)

      app.use('/:profile/export', exportRouter)

      app.use('/:profile/brand', brandRouter)

      app.use('/:profile/dashboard', dashboardRouter)

      app.use('/login', loginRouter)
      app.use('/', siteRouter)

      // app.post('/search', (req,res) => {
      //   console.log(req.body)
      //   res.send('')
      // })
}

module.exports = route;