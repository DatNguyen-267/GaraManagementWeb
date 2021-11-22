const express = require('express')
const router = express.Router()

const EmployeeTagController = require('../app/controllers/employeeTagController')

// router.post('/create', receptionController.create)
router.get('/', EmployeeTagController.show);
router.post('/create', EmployeeTagController.create);
router.put('/:id/edit', EmployeeTagController.edit) //slug
router.delete('/:id/delete', EmployeeTagController.delete) //slug

module.exports = router