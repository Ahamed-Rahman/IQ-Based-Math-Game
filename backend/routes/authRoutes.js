const express = require('express');
const { signup, login, getUserScore } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Use controllers for cleaner routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/user', authMiddleware, getUserScore);

module.exports = router;
