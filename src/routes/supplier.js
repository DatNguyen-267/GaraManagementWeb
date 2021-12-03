const express = require('express')
const supplierController = require('../app/controllers/SupplierController')
const router = express.Router()

router.get('/', supplierController.show)
router.post('/create', supplierController.create)
router.delete('/:id/delete', supplierController.delete)
router.put('/:id', supplierController.edit)

module.exports = router;