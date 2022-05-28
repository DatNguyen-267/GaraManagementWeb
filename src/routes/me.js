const express = require('express')
const router = express.Router()

const meController = require('../app/controllers/MeController')
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
router.get('/stored/courses',cookieJwtAuth, meController.storedCourses)
router.get('/trash/courses',cookieJwtAuth, meController.trashCourses)


module.exports = router