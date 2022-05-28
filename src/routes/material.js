const express = require('express')
const materialController = require('../app/controllers/MaterialController')
const router = express.Router()
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
router.get('/',cookieJwtAuth, materialController.show)
router.post('/create', materialController.create)
router.delete('/:id/delete', materialController.delete)
router.put('/:id', materialController.edit)

module.exports = router;