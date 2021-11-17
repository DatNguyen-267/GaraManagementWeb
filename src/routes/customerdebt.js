const express = require('express')
const router = express.Router()

const customerController = require('../app/controllers/CustomerController')

router.get('/', customerController.showdebt)
module.exports = router