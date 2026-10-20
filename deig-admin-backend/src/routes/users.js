const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');

router.route('/')
  .get(protect, checkPermissions(['users:view']), getAllUsers)
  .post(protect, checkPermissions(['users:invite']), createUser);

router.route('/:id')
  .get(protect, checkPermissions(['users:view']), getUserById)
  .put(protect, checkPermissions(['users:manage']), updateUser)
  .delete(protect, checkPermissions(['users:manage']), deleteUser);

module.exports = router;
