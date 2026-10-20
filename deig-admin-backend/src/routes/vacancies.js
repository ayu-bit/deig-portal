
const express = require('express');
const router = express.Router();
const vacancyController = require('../controllers/vacancyController');
const { verifyToken } = require('../middleware/auth');
const { isHROrAdmin } = require('../middleware/roles');
const { logAction } = require('../middleware/audit');

// Public routes
router.get('/', vacancyController.getAllVacancies);
router.get('/:id', vacancyController.getVacancyById);

// Protected routes
router.post('/', verifyToken, isHROrAdmin, logAction('Create Vacancy'), vacancyController.createVacancy);
router.put('/:id', verifyToken, isHROrAdmin, logAction('Update Vacancy'), vacancyController.updateVacancy);
router.delete('/:id', verifyToken, isHROrAdmin, logAction('Delete Vacancy'), vacancyController.deleteVacancy);

module.exports = router;
