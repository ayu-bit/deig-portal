
const express = require('express');
const router = express.Router();
const {
  getAllSuppliers,
  getSupplierById,
  updateSupplierStatus,
} = require('../controllers/suppliersController');
const { protect } = require('../middleware/auth');
const { checkPermissions } = require('../middleware/roles');

router.route('/')
  .get(protect, checkPermissions(['settings:view']), getAllSuppliers);

router.route('/:id')
  .get(protect, checkPermissions(['settings:view']), getSupplierById);

router.route('/:id/status')
  .put(protect, checkPermissions(['settings:edit']), updateSupplierStatus);

module.exports = router;
