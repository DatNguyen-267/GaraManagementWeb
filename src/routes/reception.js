const express = require('express')
const router = express.Router()

const receptionController = require('../app/controllers/ReceptionController')

router.post('/create', receptionController.create)
router.put('/:id',receptionController.edit)
router.delete('/:id',receptionController.delete)
router.get('/', receptionController.show)
module.exports = router