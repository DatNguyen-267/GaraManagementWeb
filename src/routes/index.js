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
      
      app.use('/customer', customerRouter)

      app.use('/customerdebt', customerdebtRouter)

      app.use('/customerhistory', customerhistoryRouter)

      app.use('/reportsale', reportsaleRouter)

      app.use('/reportinventory', reportinventoryRouter)

      app.use('/material', materialRouter)

      app.use('/supplier', supplierRouter)

      app.use('/import', importRouter)

      app.use('/export', exportRouter)

      app.use('/brand', brandRouter)

      app.use('/', siteRouter)

      

      // app.post('/search', (req,res) => {
      //   console.log(req.body)
      //   res.send('')
      // })
}

module.exports = route;