const express = require('express')
const router = express.Router()

const wageController = require('../app/controllers/WageController')

router.post('/create', wageController.create)
router.put('/:id',wageController.edit)
router.delete('/:id',wageController.delete)
router.get('/', wageController.show)
module.exports = router