
const express = require('express');
const router = express.Router();
const milestoneController = require('../controllers/milestoneController');
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');
const { logAction } = require('../middleware/audit');

const canEdit = checkRole(['Admin', 'Editor']);

// Public
router.get('/', milestoneController.getAllMilestones);

// Protected
router.post('/', verifyToken, canEdit, logAction('Create Milestone'), milestoneController.createMilestone);
router.put('/:id', verifyToken, canEdit, logAction('Update Milestone'), milestoneController.updateMilestone);
router.delete('/:id', verifyToken, canEdit, logAction('Delete Milestone'), milestoneController.deleteMilestone);

module.exports = router;
