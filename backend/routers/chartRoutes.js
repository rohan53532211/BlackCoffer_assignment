const express = require("express");

const router = express.Router();

const {getChart} = require("../controllers/chartController");

router.get("/:field", getChart);

module.exports = router;