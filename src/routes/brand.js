const express = require('express')
const BrandController = require('../app/controllers/BrandController')
const router = express.Router()

const bandController = require('../app/controllers/BrandController')

// router.post('/create', receptionController.create)
// router.put('/:id',receptionController.edit)
// router.get('/', receptionController.show)
router.post('/create', BrandController.create)
router.delete('/:id/delete', BrandController.delete) //slug
router.put('/:id/edit', BrandController.edit) //slug
.get('/', BrandController.show)

module.exports = router