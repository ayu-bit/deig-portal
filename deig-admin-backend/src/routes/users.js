
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { verifyToken } = require('../middleware/auth');
const { isAdmin } = require('../middleware/roles');
const { logAction } = require('../middleware/audit');

// All routes in this file are protected and require admin role
router.use(verifyToken, isAdmin);

// @route   GET /api/v1/users
// @desc    Get all users
router.get('/', usersController.getAllUsers);

// @route   GET /api/v1/users/:id
// @desc    Get a single user by ID
router.get('/:id', usersController.getUserById);

// @route   POST /api/v1/users
// @desc    Create a new user
router.post('/', logAction('Create User'), usersController.createUser);

// @route   PUT /api/v1/users/:id
// @desc    Update a user
router.put('/:id', logAction('Update User'), usersController.updateUser);

// @route   DELETE /api/v1/users/:id
// @desc    Delete a user
router.delete('/:id', logAction('Delete User'), usersController.deleteUser);

module.exports = router;
