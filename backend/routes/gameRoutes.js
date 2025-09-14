const express = require('express');
const { getBananaQuestion, updateScore, getLeaderboard } = require('../controllers/gameController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Use controllers for cleaner routes
router.get('/banana', getBananaQuestion);
router.post('/update-score', authMiddleware, updateScore);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
