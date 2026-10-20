
const { Supplier } = require('../models');
const mediaService = require('../services/mediaService');

exports.createPublicSupplier = async (req, res) => {
    try {
        const { companyName, registrationNumber, address, contactPerson, contactEmail } = req.body;
        let profileUrl = null;

        if (req.file) {
            const mediaFile = await mediaService.handleFileUpload(req.file, null);
            profileUrl = mediaFile.url;
        }

        const supplier = await Supplier.create({
            companyName, registrationNumber, address, contactPerson, contactEmail, profileUrl
        });
        res.status(201).json(supplier);
    } catch (error) {
        res.status(500).json({ message: "Error submitting registration", error: error.message });
    }
};

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll({ order: [['createdAt', 'DESC']] });
        res.json(suppliers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching suppliers", error: error.message });
    }
};

exports.updateSupplierStatus = async (req, res) => {
    try {
        const supplier = await Supplier.findByPk(req.params.id);
        if (!supplier) return res.status(404).json({ message: "Supplier not found" });
        await supplier.update({ status: req.body.status });
        res.json({ message: "Supplier status updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating supplier", error: error.message });
    }
};
