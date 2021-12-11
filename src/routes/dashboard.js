const express = require('express')
const BrandController = require('../app/controllers/BrandController')
const router = express.Router()

const dashboardController = require('../app/controllers/DashboardController')

router.get('/', dashboardController.show)

module.exports = router