
const { Supplier } = require('../models');

// @desc    Get all registered suppliers
// @route   GET /api/suppliers
// @access  Private (Admin/Procurement)
const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll({
      order: [['registeredAt', 'DESC']]
    });
    res.status(200).json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    res.status(500).json({ message: 'Server error fetching suppliers', error: error.message });
  }
};

// @desc    Get a single supplier by ID
// @route   GET /api/suppliers/:id
// @access  Private
const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      res.status(200).json(supplier);
    } else {
      res.status(404).json({ message: 'Supplier record not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update supplier verification status
// @route   PUT /api/suppliers/:id/status
// @access  Private (Admin/Procurement)
const updateSupplierStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (supplier) {
      supplier.status = status;
      await supplier.save();
      res.status(200).json(supplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    console.error("Error updating supplier status:", error);
    res.status(500).json({ message: 'Server error updating supplier status', error: error.message });
  }
};

module.exports = {
  getAllSuppliers,
  getSupplierById,
  updateSupplierStatus,
};
