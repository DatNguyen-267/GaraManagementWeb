const express = require('express')
const router = express.Router()

const customerController = require('../app/controllers/CustomerController')

router.get('/', customerController.showhistory)
router.get('/:id/customerhistorydetail', customerController.customerHistoryDetail)

module.exports = router