
const express = require('express');
const router = express.Router();
const securityController = require('../controllers/securityController');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');
const { logAction } = require('../middleware/audit');

// All routes are protected and for admins only
router.use(verifyToken, isAdmin);

// @route   GET /api/v1/security/logs
// @desc    Get recent audit logs
router.get('/logs', securityController.getAuditLogs);

// @route   GET /api/v1/security/alerts
// @desc    Get security alerts
router.get('/alerts', securityController.getSecurityAlerts);

// @route   GET /api/v1/security/whitelist
// @desc    Get whitelisted IPs
router.get('/whitelist', securityController.getWhitelistedIps);

// @route   POST /api/v1/security/whitelist
// @desc    Add IP to whitelist
router.post('/whitelist', logAction('Add Whitelisted IP'), securityController.addWhitelistedIp);

// @route   DELETE /api/v1/security/whitelist/:id
// @desc    Remove IP from whitelist
router.delete('/whitelist/:id', logAction('Remove Whitelisted IP'), securityController.deleteWhitelistedIp);

module.exports = router;
