const express = require('express');
const router = express.Router();
const { getSecurityLogs, getActiveSessions, revokeSession } = require('../controllers/securityController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');

router.use(protect, checkPermissions(['security:view']));

router.get('/logs', getSecurityLogs);
router.get('/sessions', getActiveSessions);
router.delete('/sessions/:id', revokeSession);

module.exports = router;
