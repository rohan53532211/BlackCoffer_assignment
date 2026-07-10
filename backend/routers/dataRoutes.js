const express = require('express');
const router = express.Router();

const {getAllInsights} = require('../controllers/dataController');
const {getFilters} = require('../controllers/filterController');
const {getDashboardStats} = require('../controllers/dashboardContrller');



router.get("/data", getAllInsights);
router.get("/filters", getFilters);
router.get("/dashboard", getDashboardStats);

module.exports = router;