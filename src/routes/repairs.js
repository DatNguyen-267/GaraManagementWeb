const express = require('express')
const router = express.Router()

const repairController = require('../app/controllers/RepairController')

router.post('/create', repairController.create)
router.put('/:id/edit', repairController.edit)
router.delete('/:id/delete', repairController.delete)
router.get('/:id/repair-detail', repairController.repairDetail)
router.get('/', repairController.show)

module.exports = router