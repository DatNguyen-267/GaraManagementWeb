const express = require('express')
const exportController = require('../app/controllers/ExportController')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
router.get('/',cookieJwtAuth, exportController.show)
router.post('/create', exportController.create)
router.put('/:idVoucher/export', exportController.export)
router.put('/detail/:idVoucher/export', exportController.export)

router.get('/detail/:idVoucher', exportController.showDetail)

module.exports = router;