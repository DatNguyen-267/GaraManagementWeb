const express = require('express')
const EmployeeSalaryController = require('../app/controllers/EmployeeSalaryController')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')

router.get('/',cookieJwtAuth, EmployeeSalaryController.show);
router.get('/SalaryInfo',cookieJwtAuth,EmployeeSalaryController.getSalaryInfo)
router.post('/create', EmployeeSalaryController.create);
router.put('/edit', EmployeeSalaryController.edit) //slug
router.delete('/:id/delete', EmployeeSalaryController.delete) //slug

module.exports = router