const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feedController');

router.post('/', feedController.generateFeed);

module.exports = router;