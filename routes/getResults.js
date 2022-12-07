const express = require('express');
const router = express.Router();
const getResultsController = require('../controllers/getResultsController');

router.post('/', getResultsController.sendResults);

module.exports = router;