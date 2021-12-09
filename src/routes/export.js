const express = require('express')
const exportController = require('../app/controllers/ExportController')
const router = express.Router()

router.get('/', exportController.show)
router.post('/create', exportController.create)
router.put('/:idVoucher/export', exportController.export)

router.get('/detail/:idVoucher', exportController.showDetail)

module.exports = router;