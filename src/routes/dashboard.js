const express = require('express')
const BrandController = require('../app/controllers/BrandController')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const dashboardController = require('../app/controllers/DashboardController')

router.get('/',cookieJwtAuth, dashboardController.show)

module.exports = router