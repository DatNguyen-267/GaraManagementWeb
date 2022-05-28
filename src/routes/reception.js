const express = require('express')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const receptionController = require('../app/controllers/ReceptionController')

router.post('/create', receptionController.create)
router.post('/:id/create-bill', receptionController.createBill)
router.post('/:id/create-debt', receptionController.createDebt)
router.put('/:id',receptionController.edit)
router.delete('/:id',receptionController.delete)
router.get('/:id/pay',cookieJwtAuth, receptionController.showPay)
router.get('/:id/debt',cookieJwtAuth, receptionController.showDebt)
router.get('/',cookieJwtAuth, receptionController.show)
module.exports = router