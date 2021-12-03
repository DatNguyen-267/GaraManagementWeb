const express = require('express')
const router = express.Router()

const repairController = require('../app/controllers/RepairController')


router.post('/:id/:materialId/create-material', repairController.createMaterial)
router.post('/:id/:wageId/create-wage', repairController.createWage)
router.post('/:id/:employeeId/create-employee', repairController.createEmployee)
router.post('/create', repairController.create)
router.post('/:id/create-contract', repairController.createContract)
router.post('/:id/ordered', repairController.ordered)

router.put('/:id/accept-success-repair', repairController.acceptSuccess)

router.put('/:id/edit', repairController.edit)
router.put('/:idMaterialDetail/:idMaterial/edit-material', repairController.editMaterial)
router.put('/:idWageDetail/:idWage/edit-wage', repairController.editWage)
router.put('/:idEmployeeDetail/:idEmployee/edit-employee', repairController.editEmployee)
router.delete('/:id/delete', repairController.delete)
router.delete('/:id/:idDetail/delete-detail-material', repairController.deleteDetailMaterial)
router.delete('/:id/:idDetail/delete-detail-wage', repairController.deleteDetailWage)
router.delete('/:id/:idDetail/delete-detail-employee', repairController.deleteDetailEmployee)
router.get('/:id/repair-detail', repairController.repairDetail)
router.get('/:id/quote', repairController.quote)
router.get('/:id/contract', repairController.contract)
router.get('/:id/contract-detail', repairController.contractDetail)
router.get('/', repairController.show)

module.exports = router