const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/drivers', productsController.getDrivers);

module.exports = router;
