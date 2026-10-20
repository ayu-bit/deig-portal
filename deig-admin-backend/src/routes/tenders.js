const express = require('express');
const router = express.Router();
const { getAllTenders, createTender, updateTender, deleteTender } = require('../controllers/tendersController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');

router.route('/')
    .get(getAllTenders) // Public for frontend
    .post(protect, checkPermissions(['settings:edit']), createTender); // Assuming settings/procurement manager can create

router.route('/:id')
    .put(protect, checkPermissions(['settings:edit']), updateTender)
    .delete(protect, checkPermissions(['settings:edit']), deleteTender);

module.exports = router;
