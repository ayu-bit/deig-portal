
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { verifyToken } = require('../middleware/auth');
const { isEditorOrAdmin } = require('../middleware/roles');
const { logAction } = require('../middleware/audit');

// Public routes
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);

// Protected routes
router.post('/', verifyToken, isEditorOrAdmin, logAction('Create News'), newsController.createNews);
router.put('/:id', verifyToken, isEditorOrAdmin, logAction('Update News'), newsController.updateNews);
router.delete('/:id', verifyToken, isEditorOrAdmin, logAction('Delete News'), newsController.deleteNews);

module.exports = router;
