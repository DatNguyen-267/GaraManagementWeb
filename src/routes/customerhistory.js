const express = require('express')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const customerController = require('../app/controllers/CustomerController')

router.get('/', customerController.showhistory)
router.get('/:id/customerhistorydetail',cookieJwtAuth, customerController.customerHistoryDetail)

module.exports = router