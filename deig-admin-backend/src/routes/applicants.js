
const express = require('express');
const router = express.Router();
const multer = require('multer');
const applicantController = require('../controllers/applicantController');
const { verifyToken } = require('../middleware/auth');
const { isHROrAdmin } = require('../middleware/roles');
const { logAction } = require('../middleware/audit');

const upload = multer({ dest: 'uploads/' });

// PUBLIC ROUTE for general CV submission
router.post('/public', upload.single('cv'), applicantController.createPublicApplicant);

// All subsequent applicant routes are protected
router.use(verifyToken, isHROrAdmin);

// Get all applicants (potentially with filters)
router.get('/', applicantController.getAllApplicants);

// Get all applicants for a specific vacancy
router.get('/vacancy/:vacancyId', applicantController.getApplicantsByVacancy);

// Get a single applicant by ID
router.get('/:id', applicantController.getApplicantById);

// Create an applicant (e.g., from public form submission)
// Note: This might need a separate, less protected route if it's a public form
router.post('/', logAction('Create Applicant'), applicantController.createApplicant);

// Update an applicant's status, notes, etc.
router.put('/:id', logAction('Update Applicant'), applicantController.updateApplicant);

// Delete an applicant
router.delete('/:id', logAction('Delete Applicant'), applicantController.deleteApplicant);

module.exports = router;