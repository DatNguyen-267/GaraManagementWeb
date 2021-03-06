const express = require('express')
const settingController = require('../app/controllers/SettingController')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
router.get('/',cookieJwtAuth, settingController.show)
// router.get('/error', settingController.showError)
router.post('/edit-gara-information', settingController.editGaraInformation)
router.post('/change-password', settingController.changePassword)

module.exports = router;