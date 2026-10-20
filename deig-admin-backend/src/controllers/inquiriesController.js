
const { Inquiry, User } = require('../models');

const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await Inquiry.findAll({
            order: [['createdAt', 'DESC']],
            include: { model: User, as: 'assignedTo', attributes: ['name'] }
        });
        
        // Flatten for frontend
        const formatted = inquiries.map(i => {
            const json = i.toJSON();
            return {
                ...json,
                assignedTo: json.assignedTo ? json.assignedTo.name : null
            };
        });
        
        res.status(200).json(formatted);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const createInquiry = async (req, res) => {
    try {
        const savedInquiry = await Inquiry.create(req.body);
        res.status(201).json(savedInquiry);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByPk(req.params.id);
        if (inquiry) {
            await inquiry.update(req.body);
            res.status(200).json(inquiry);
        } else {
            res.status(404).json({ message: 'Inquiry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteInquiry = async (req, res) => {
    try {
        const inquiry = await Inquiry.findByPk(req.params.id);
        if (inquiry) {
            await inquiry.destroy();
            res.status(200).json({ message: 'Inquiry removed' });
        } else {
            res.status(404).json({ message: 'Inquiry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllInquiries, createInquiry, updateInquiry, deleteInquiry };
