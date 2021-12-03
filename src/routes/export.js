const express = require('express')
const exportController = require('../app/controllers/ExportController')
const router = express.Router()

router.get('/', exportController.show)
router.put('/:idRepair/export', exportController.export)

router.get('/detail/:idRepair', exportController.showDetail)

module.exports = router;