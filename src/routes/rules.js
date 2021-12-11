const express = require('express')
const RuleController = require('../app/controllers/RuleController')
const router = express.Router()

//router.post('/create', BrandController.create)
//router.delete('/:id/delete', BrandController.delete) //slug
//router.put('/:id/edit', BrandController.edit) //slug
router.get('/', RuleController.show);
router.post('/create', RuleController.create);
router.put('/:id/edit', RuleController.edit) //slug
router.delete('/:id/delete', RuleController.delete) //slug
module.exports = router