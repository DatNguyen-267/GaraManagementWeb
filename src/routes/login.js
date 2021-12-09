const express = require('express')
const loginController = require('../app/controllers/LoginController')
const router = express.Router()


router.post('/', loginController.login)
router.get('/', loginController.show)

module.exports = router;