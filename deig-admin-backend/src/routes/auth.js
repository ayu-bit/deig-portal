
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/v1/auth/register
// @desc    Register a new user (for initial setup, should be protected)
// @access  Public (for now)
router.post('/register', authController.register);

// @route   POST /api/v1/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', authController.login);

module.exports = router;
