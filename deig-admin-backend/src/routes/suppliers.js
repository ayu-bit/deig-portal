
const express = require('express');
const router = express.Router();
const multer = require('multer');
const supplierController = require('../controllers/supplierController');
const { verifyToken } = require('../middleware/auth');
const { checkRole } = require('../middleware/roles');
const { logAction } = require('../middleware/audit');

const upload = multer({ dest: 'uploads/' });
const canManage = checkRole(['Admin', 'Industry Manager']);

// Public
router.post('/public', upload.single('profile'), supplierController.createPublicSupplier);

// Protected
router.get('/', verifyToken, canManage, supplierController.getAllSuppliers);
router.put('/:id/status', verifyToken, canManage, logAction('Update Supplier Status'), supplierController.updateSupplierStatus);

module.exports = router;
