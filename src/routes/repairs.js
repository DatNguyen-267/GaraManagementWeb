const express = require('express')
const router = express.Router()

const repairController = require('../app/controllers/RepairController')

router.post('/create', repairController.create)
router.get('/', repairController.show)

module.exports = router