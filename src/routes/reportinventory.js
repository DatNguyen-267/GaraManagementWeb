const express = require('express')
const router = express.Router()

const reportinventoryController = require('../app/controllers/ReportinventoryController')

router.post('/create',reportinventoryController.create)
router.get('/', reportinventoryController.show)
router.get('/:time', reportinventoryController.find)

module.exports = router