const express = require('express')
const importController = require('../app/controllers/ImportController')
const router = express.Router()

router.get('/', importController.show)
router.post('/create', importController.create)
router.delete('/:id/delete', importController.delete)
router.put('/:id', importController.edit)

module.exports = router;