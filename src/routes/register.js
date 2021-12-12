const express = require('express')
const RegisterController = require('../app/controllers/RegisterController')
const router = express.Router()

//router.post('/create', BrandController.create)
//router.delete('/:id/delete', BrandController.delete) //slug
//router.put('/:id/edit', BrandController.edit) //slug
router.get('/', RegisterController.show);
router.post('/create', RegisterController.create);
router.put('/:id/edit', RegisterController.edit) //slug
router.delete('/:id/delete', RegisterController.delete) //slug
module.exports = router