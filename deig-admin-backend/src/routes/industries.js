
const express = require('express');
const router = express.Router();
const industriesController = require('../controllers/industriesController');
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');
const { logAction } = require('../middleware/audit');

const canEditIndustries = checkRole(['Admin', 'Industry Manager']);

// Public routes
router.get('/', industriesController.getAllIndustries);
router.get('/:id', industriesController.getIndustryById);

// Protected routes
router.post('/', verifyToken, canEditIndustries, logAction('Create Industry'), industriesController.createIndustry);
router.put('/:id', verifyToken, canEditIndustries, logAction('Update Industry'), industriesController.updateIndustry);
router.delete('/:id', verifyToken, checkRole(['Admin']), logAction('Delete Industry'), industriesController.deleteIndustry);

module.exports = router;
