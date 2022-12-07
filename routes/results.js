const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/resultsController');

router.post('/', resultsController.receiveResults);

module.exports = router;