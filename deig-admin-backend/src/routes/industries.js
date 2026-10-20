
const express = require('express');
const router = express.Router();
const {
  getAllIndustries,
  getIndustryById,
  createIndustry,
  updateIndustry,
} = require('../controllers/industriesController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');

// Public route to get all industries for the frontend
router.get('/', getAllIndustries);

// Protected route to create a new industry
router.post('/', protect, checkPermissions(['industry:edit']), createIndustry);

router.route('/:id')
    // Public route to get a single industry
  .get(getIndustryById)
  // Protected route to update an industry
  .put(protect, checkPermissions(['industry:edit']), updateIndustry);

module.exports = router;
