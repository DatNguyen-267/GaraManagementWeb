const express = require('express')
const importController = require('../app/controllers/ImportController')
const router = express.Router()

router.get('/', importController.show)
router.post('/create', importController.create)
router.delete('/:id/delete', importController.delete)
router.put('/:id', importController.edit)

router.get('/:idVoucher', importController.showDetail)
router.post('/:idVoucher/:idMaterial/add', importController.addMaterial)
router.delete('/:idVoucher/:idMaterial/delete', importController.deleteMaterial)

module.exports = router;