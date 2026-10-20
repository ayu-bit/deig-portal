const express = require('express');
const router = express.Router();
const multer = require('multer');
const contactController = require('../controllers/contactController');
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');
const { logAction } = require('../middleware/audit');

const canManageContacts = checkRole(['Admin', 'Editor', 'HR Manager']);
const upload = multer({ dest: 'uploads/' });

// PUBLIC ROUTE for form submission
router.post('/public', upload.single('attachment'), contactController.createContact);

// Apply auth middleware for all subsequent routes
router.use(verifyToken, canManageContacts);

// PROTECTED ROUTES
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.put('/:id', logAction('Update Contact Inquiry'), contactController.updateContact);
router.delete('/:id', logAction('Delete Contact Inquiry'), contactController.deleteContact);

module.exports = router;