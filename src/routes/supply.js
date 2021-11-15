const express = require('express')
const SupplyController = require('../app/controllers/SupplyController')
const router = express.Router()

router.get('/', SupplyController.show)
router.post('/create', SupplyController.create)
router.delete('/:id/delete', SupplyController.delete)

module.exports = router;