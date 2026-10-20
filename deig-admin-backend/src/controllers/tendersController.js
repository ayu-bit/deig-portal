
const { Tender } = require('../models');

const getAllTenders = async (req, res) => {
    try {
        const tenders = await Tender.findAll({ order: [['publishedDate', 'DESC']] });
        res.status(200).json(tenders);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const createTender = async (req, res) => {
    try {
        const savedTender = await Tender.create(req.body);
        res.status(201).json(savedTender);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateTender = async (req, res) => {
    try {
        const tender = await Tender.findByPk(req.params.id);
        if (tender) {
            await tender.update(req.body);
            res.status(200).json(tender);
        } else {
            res.status(404).json({ message: 'Tender not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteTender = async (req, res) => {
    try {
        const tender = await Tender.findByPk(req.params.id);
        if (tender) {
            await tender.destroy();
            res.status(200).json({ message: 'Tender removed' });
        } else {
            res.status(404).json({ message: 'Tender not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllTenders, createTender, updateTender, deleteTender };
