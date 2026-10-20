const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');

// All routes are protected and for admins only
router.use(verifyToken, isAdmin);

// @route   GET /api/v1/statistics/dashboard
// @desc    Get key statistics for the admin dashboard
router.get('/dashboard', statisticsController.getDashboardStats);

module.exports = router;