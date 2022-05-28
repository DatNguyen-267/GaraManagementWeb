const express = require('express')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const repairController = require('../app/controllers/RepairController')


router.post('/:id/:materialId/create-material', repairController.createMaterial)
router.post('/:id/:wageId/create-wage', repairController.createWage)
router.post('/:id/:employeeId/create-employee', repairController.createEmployee)
router.post('/create', repairController.create)
router.post('/:id/create-contract', repairController.createContract)
router.post('/:id/ordered', repairController.ordered)

router.put('/:id/accept-success-repair', repairController.acceptSuccess)

router.put('/:id/:id/edit', repairController.edit)
router.put('/:id/:idMaterialDetail/:idMaterial/edit-material', repairController.editMaterial)
router.put('/:id/:idWageDetail/:idWage/edit-wage', repairController.editWage)
router.put('/:id/:idEmployeeDetail/:idEmployee/edit-employee', repairController.editEmployee)
router.delete('/:id/delete', repairController.delete)
router.delete('/:id/:idDetail/delete-detail-material', repairController.deleteDetailMaterial)
router.delete('/:id/:idDetail/delete-detail-wage', repairController.deleteDetailWage)
router.delete('/:id/:idDetail/delete-detail-employee', repairController.deleteDetailEmployee)
router.get('/:id/repair-detail',cookieJwtAuth, repairController.repairDetail)
router.get('/:id/quote',cookieJwtAuth, repairController.quote)
router.get('/:id/contract',cookieJwtAuth, repairController.contract)
router.get('/:id/contract-detail',cookieJwtAuth, repairController.contractDetail)
router.get('/',cookieJwtAuth, repairController.show)

module.exports = router