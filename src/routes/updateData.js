const express = require("express");

const router = express.Router();

const updateDataController = require("../app/controllers/UpdateDataController");

router.get("/testLogin", updateDataController.show);
module.exports = router;
