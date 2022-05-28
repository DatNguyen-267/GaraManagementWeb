const express = require('express')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const reportinventoryController = require('../app/controllers/ReportinventoryController')

router.post('/create',reportinventoryController.create)
router.get('/',cookieJwtAuth, reportinventoryController.show)
router.get('/:time',cookieJwtAuth, reportinventoryController.find)

module.exports = router