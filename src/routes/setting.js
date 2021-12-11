const express = require('express')
const settingController = require('../app/controllers/SettingController')
const router = express.Router()

router.get('/', settingController.show)

module.exports = router;