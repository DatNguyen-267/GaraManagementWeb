const express = require('express')
const EmployeeListController = require('../app/controllers/EmployeeListController')
const router = express.Router()

//router.post('/create', BrandController.create)
//router.delete('/:id/delete', BrandController.delete) //slug
//router.put('/:id/edit', BrandController.edit) //slug
router.get('/', EmployeeListController.show);
router.post('/create', EmployeeListController.create);
router.put('/:id/edit', EmployeeListController.edit) //slug
router.delete('/:id/delete', EmployeeListController.delete) //slug
module.exports = router