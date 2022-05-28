const express = require('express')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const siteController = require('../app/controllers/SiteController')

router.get('/search',cookieJwtAuth, siteController.search)
router.get('/',cookieJwtAuth, siteController.home)

module.exports = router