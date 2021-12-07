const express = require('express')
const EmployeeManagermentController = require('../app/controllers/EmployeeManagermentController')
const router = express.Router()



router.get('/', EmployeeManagermentController.show);
router.get('/:id/info', EmployeeManagermentController.infoShow)
//date off
router.post('/dateoff/create', EmployeeManagermentController.createDateoff);
router.put('/dateoff/:id/edit', EmployeeManagermentController.editDateoff) //slug
router.delete('/dateoff/:id/delete', EmployeeManagermentController.deleteDayoff) //slug
//error
router.post('/error/create', EmployeeManagermentController.createError);
router.put('/error/:id/edit', EmployeeManagermentController.editError) //slug
router.delete('/error/:id/delete', EmployeeManagermentController.deleteError) //slug

module.exports = router