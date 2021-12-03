const newsRouter = require('./news')
const siteRouter = require('./site')
const coursesRouter = require('./courses')
const meRouter = require('./me')
const receptionRouter = require('./reception')
const brandRouter = require('./brand')
const materialRouter = require('./material')
const repairRouter = require('./repairs')
const customerRouter =require('./customer')
const customerdebtRouter =require('./customerdebt')
const supplierRouter = require('./supplier')
const importRouter = require('./import')
const exportRouter = require('./export')


function route(app) {
      app.use('/news', newsRouter)

      app.use('/courses', coursesRouter)

      app.use('/me', meRouter)

      app.use('/reception', receptionRouter)
      
      app.use('/repairs', repairRouter)

      app.use('/brand', brandRouter)

      app.use('/customer', customerRouter)

      app.use('/customerdebt', customerdebtRouter)

      app.use('/material', materialRouter)

      app.use('/supplier', supplierRouter)

      app.use('/import', importRouter)

      app.use('/export', exportRouter)

      app.use('/', siteRouter)

      // app.post('/search', (req,res) => {
      //   console.log(req.body)
      //   res.send('')
      // })
}

module.exports = route;