
const { Tender } = require('../models');

exports.getAllTenders = async (req, res) => {
    try {
        const tenders = await Tender.findAll({ order: [['closingDate', 'DESC']] });
        res.json(tenders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tenders", error: error.message });
    }
};

exports.createTender = async (req, res) => {
    try {
        const tender = await Tender.create(req.body);
        res.status(201).json(tender);
    } catch (error) {
        res.status(500).json({ message: "Error creating tender", error: error.message });
    }
};

exports.updateTender = async (req, res) => {
    try {
        const tender = await Tender.findByPk(req.params.id);
        if (!tender) return res.status(404).json({ message: "Tender not found" });
        await tender.update(req.body);
        res.json({ message: "Tender updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating tender", error: error.message });
    }
};

exports.deleteTender = async (req, res) => {
    try {
        const tender = await Tender.findByPk(req.params.id);
        if (!tender) return res.status(404).json({ message: "Tender not found" });
        await tender.destroy();
        res.json({ message: "Tender deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting tender", error: error.message });
    }
};
