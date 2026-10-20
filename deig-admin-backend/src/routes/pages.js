const express = require('express');
const router = express.Router();
const { getAllPages, createPage, updatePage, deletePage } = require('../controllers/pagesController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');

router.route('/')
    .get(protect, checkPermissions(['pages:view']), getAllPages)
    .post(protect, checkPermissions(['pages:create']), createPage);

router.route('/:id')
    .put(protect, checkPermissions(['pages:edit']), updatePage)
    .delete(protect, checkPermissions(['pages:delete']), deletePage);

module.exports = router;
