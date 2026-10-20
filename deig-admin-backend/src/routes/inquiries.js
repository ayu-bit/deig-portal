const express = require('express');
const router = express.Router();
const { getAllInquiries, createInquiry, updateInquiry, deleteInquiry } = require('../controllers/inquiriesController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');

// Public route for form submission
router.post('/', createInquiry);

router.route('/')
    .get(protect, checkPermissions(['inquiries:view']), getAllInquiries);

router.route('/:id')
    .put(protect, checkPermissions(['inquiries:manage']), updateInquiry)
    .delete(protect, checkPermissions(['inquiries:manage']), deleteInquiry);

module.exports = router;
