const express = require('express')
const EmployeeManagermentController = require('../app/controllers/EmployeeManagermentController')
const router = express.Router()


// router.post('/create', receptionController.create)
// router.put('/:id',receptionController.edit)
router.get('/', EmployeeManagermentController.show);
router.post('/create', EmployeeManagermentController.create);
router.put('/:id/edit', EmployeeManagermentController.edit) //slug
router.delete('/:id/delete', EmployeeManagermentController.delete) //slug

module.exports = router