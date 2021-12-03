const express = require('express')
const importController = require('../app/controllers/ImportController')
const router = express.Router()

router.get('/', importController.show)
router.post('/create', importController.create)
router.delete('/:id/delete', importController.delete)
router.put('/:id', importController.edit)

router.get('/detail/:idVoucher', importController.showDetail)
router.post('/detail/:idVoucher/add', importController.addMaterial)
router.delete('/detail/:idVoucher/:idDetail/delete', importController.deleteMaterial)
router.put('/detail/:idVoucher/:idDetail', importController.editMaterial)

router.put('/detail/:idVoucher', importController.importMaterial)

module.exports = router;