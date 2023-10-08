const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Define a route to handle user movie actions
router.post('/movielist', movieController.saveUserMovieAction);

module.exports = router;