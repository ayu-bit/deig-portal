
const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');
const { logAction } = require('../middleware/audit');

// All routes are protected and for admins only
router.use(verifyToken, isAdmin);

// @route   GET /api/v1/settings
// @desc    Get all system settings
router.get('/', settingController.getAllSettings);

// @route   PUT /api/v1/settings
// @desc    Update settings in bulk
router.put('/', logAction('Update System Settings'), settingController.updateSettings);

module.exports = router;
