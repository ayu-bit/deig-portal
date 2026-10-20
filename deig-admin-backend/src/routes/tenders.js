
const express = require('express');
const router = express.Router();
const tenderController = require('../controllers/tenderController');
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');
const { logAction } = require('../middleware/audit');

const canManage = checkRole(['Admin', 'Editor', 'Industry Manager']);

// Public
router.get('/', tenderController.getAllTenders);

// Protected
router.post('/', verifyToken, canManage, logAction('Create Tender'), tenderController.createTender);
router.put('/:id', verifyToken, canManage, logAction('Update Tender'), tenderController.updateTender);
router.delete('/:id', verifyToken, canManage, logAction('Delete Tender'), tenderController.deleteTender);

module.exports = router;
