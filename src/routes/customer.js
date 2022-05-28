const express = require('express')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const customerController = require('../app/controllers/CustomerController')

router.post('/create', customerController.create)
router.put('/:id',customerController.edit)
router.delete('/:id',customerController.delete)
router.get('/',cookieJwtAuth, customerController.show)
module.exports = router