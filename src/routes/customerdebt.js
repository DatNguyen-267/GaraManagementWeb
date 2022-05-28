const express = require('express')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const customerController = require('../app/controllers/CustomerController')

router.get('/', customerController.showdebt)
router.get('/:id/customerdebtdetail',cookieJwtAuth, customerController.customerDebtDetail)
module.exports = router