
const { Industry } = require('../models');

// Placeholder for all CRUD operations

exports.getAllIndustries = async (req, res) => {
    try {
        const industries = await Industry.findAll();
        res.json(industries);
    } catch (error) {
        res.status(500).json({ message: "Error fetching industries", error: error.message });
    }
};

exports.getIndustryById = async (req, res) => {
    try {
        const industry = await Industry.findByPk(req.params.id);
        if (!industry) return res.status(404).json({ message: "Industry not found" });
        res.json(industry);
    } catch (error) {
        res.status(500).json({ message: "Error fetching industry", error: error.message });
    }
};

exports.createIndustry = async (req, res) => {
    try {
        const newIndustry = await Industry.create(req.body);
        res.status(201).json(newIndustry);
    } catch (error) {
        res.status(500).json({ message: "Error creating industry", error: error.message });
    }
};

exports.updateIndustry = async (req, res) => {
     try {
        const industry = await Industry.findByPk(req.params.id);
        if (!industry) return res.status(404).json({ message: "Industry not found" });
        await industry.update(req.body);
        res.json({ message: "Industry updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating industry", error: error.message });
    }
};

exports.deleteIndustry = async (req, res) => {
    try {
        const industry = await Industry.findByPk(req.params.id);
        if (!industry) return res.status(404).json({ message: "Industry not found" });
        await industry.destroy();
        res.json({ message: "Industry deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting industry", error: error.message });
    }
};
