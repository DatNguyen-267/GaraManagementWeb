const express = require('express')
const MaterialController = require('../app/controllers/MaterialController')
const router = express.Router()

router.get('/', MaterialController.show)
router.post('/create', MaterialController.create)
router.delete('/:id/delete', MaterialController.delete)

module.exports = router;