
const express = require('express');
const router = express.Router();
const {
  getApplicantsByVacancy,
  createApplicant,
  updateApplicantStatus,
} = require('../controllers/applicantController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');
const { upload } = require('../services/mediaService');

// Public route to submit an application
router.post('/', upload.single('cv'), createApplicant);

// Protected routes for admin management
router.get('/vacancy/:vacancyId', protect, checkPermissions(['vacancies:manage_applicants']), getApplicantsByVacancy);
router.put('/:id/status', protect, checkPermissions(['vacancies:manage_applicants']), updateApplicantStatus);

module.exports = router;
