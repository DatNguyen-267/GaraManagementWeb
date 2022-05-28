const express = require('express')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const reportsaleController = require('../app/controllers/ReportsaleController')

router.post('/create',reportsaleController.create)
router.get('/',cookieJwtAuth, reportsaleController.show)
router.get('/:time',cookieJwtAuth, reportsaleController.find)

module.exports = router