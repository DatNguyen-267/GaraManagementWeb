const express = require('express')
const router = express.Router()

const repairController = require('../app/controllers/RepairController')


router.post('/:id/:materialId/create-material', repairController.createMaterial)
router.post('/:id/:wageId/create-wage', repairController.createWage)
router.post('/:id/:employeeId/create-employee', repairController.createEmployee)
router.post('/create', repairController.create)
router.get('/:id/quote', repairController.quote)
router.put('/:id/edit', repairController.edit)
router.delete('/:id/delete', repairController.delete)
router.get('/:id/repair-detail', repairController.repairDetail)


router.get('/', repairController.show)

module.exports = router