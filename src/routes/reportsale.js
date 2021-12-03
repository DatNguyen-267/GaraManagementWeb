const express = require('express')
const router = express.Router()

const reportsaleController = require('../app/controllers/ReportsaleController')

router.post('/create',reportsaleController.create)
router.get('/', reportsaleController.show)
router.get('/:time', reportsaleController.find)

module.exports = router