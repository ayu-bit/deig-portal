const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');

router.get('/stats', protect, checkPermissions(['dashboard:view']), getDashboardStats);

module.exports = router;
