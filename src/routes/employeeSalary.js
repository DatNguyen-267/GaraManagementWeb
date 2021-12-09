const express = require('express')
const EmployeeSalaryController = require('../app/controllers/EmployeeSalaryController')
const router = express.Router()


router.get('/', EmployeeSalaryController.show);
router.post('/create', EmployeeSalaryController.create);
router.put('/edit', EmployeeSalaryController.edit) //slug
router.delete('/:id/delete', EmployeeSalaryController.delete) //slug

module.exports = router