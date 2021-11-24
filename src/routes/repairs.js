const express = require('express')
const router = express.Router()

const repairController = require('../app/controllers/RepairController')


router.post('/:id/:materialId/create-material', repairController.createMaterial)
router.post('/:id/:wageId/create-wage', repairController.createWage)
router.post('/:id/:employeeId/create-employee', repairController.createEmployee)
router.post('/create', repairController.create)
router.post('/:id/create-contract', repairController.createContract)
router.get('/:id/quote', repairController.quote)
router.get('/:id/contract', repairController.contract)
router.put('/:id/edit', repairController.edit)
router.put('/:idMaterialDetail/:idMaterial/edit-material', repairController.editMaterial)
router.put('/:idWageDetail/:idWage/edit-wage', repairController.editWage)
router.delete('/:id/delete', repairController.delete)
router.delete('/:id/delete-detail-material', repairController.deleteDetailMaterial)
router.get('/:id/repair-detail', repairController.repairDetail)


router.get('/', repairController.show)

module.exports = router