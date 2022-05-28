const express = require('express')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const newsController = require('../app/controllers/NewsController')

router.get('/:slug',cookieJwtAuth, newsController.show)
router.get('/',cookieJwtAuth, newsController.index)

module.exports = router