const express = require('express');
const router = express.Router();
const { getAllRoles, createRole, updateRole } = require('../controllers/rolesController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');

router.use(protect, checkPermissions(['users:manage']));

router.route('/')
    .get(getAllRoles)
    .post(createRole);

router.route('/:id')
    .put(updateRole);

module.exports = router;
