const express = require("express");

const router = express.Router();
const { cookieJwtAuth } = require('../middleware/cookieJwtAuth')
const updateDataController = require("../app/controllers/UpdateDataController");

router.get("/testLogin",cookieJwtAuth, updateDataController.show);
module.exports = router;
