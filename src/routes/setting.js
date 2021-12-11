const express = require('express')
const settingController = require('../app/controllers/SettingController')
const router = express.Router()

router.get('/', settingController.show)
router.post('/edit-gara-information', settingController.editGaraInformation)

module.exports = router;