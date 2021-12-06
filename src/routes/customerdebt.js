const express = require('express')
const router = express.Router()

const customerController = require('../app/controllers/CustomerController')

router.get('/', customerController.showdebt)
router.get('/:id/customerdebtdetail', customerController.customerDebtDetail)
module.exports = router