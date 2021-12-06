const express = require('express')
const router = express.Router()

const receptionController = require('../app/controllers/ReceptionController')

router.post('/create', receptionController.create)
router.post('/:id/create-bill', receptionController.createBill)
router.post('/:id/create-debt', receptionController.createDebt)
router.put('/:id',receptionController.edit)
router.delete('/:id',receptionController.delete)
router.get('/:id/pay', receptionController.showPay)
router.get('/:id/debt', receptionController.showDebt)
router.get('/', receptionController.show)
module.exports = router