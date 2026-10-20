const express = require('express');
const router = express.Router();
const {
  getAllVacancies,
  createVacancy,
  updateVacancy,
  deleteVacancy,
} = require('../controllers/vacancyController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');

router.route('/')
  .get(getAllVacancies) // Public for frontend
  .post(protect, checkPermissions(['vacancies:create']), createVacancy);

router.route('/:id')
  .put(protect, checkPermissions(['vacancies:edit']), updateVacancy)
  .delete(protect, checkPermissions(['vacancies:delete']), deleteVacancy);

module.exports = router;
