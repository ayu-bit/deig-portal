
const { Industry } = require('../models');

const getAllIndustries = async (req, res) => {
  try {
    const industries = await Industry.findAll();
    res.status(200).json(industries);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getIndustryById = async (req, res) => {
    try {
        const industry = await Industry.findByPk(req.params.id);
        if(industry) {
            res.status(200).json(industry);
        } else {
            res.status(404).json({ message: 'Industry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const createIndustry = async (req, res) => {
    try {
        // Check if ID exists (ID is manually entered for industries, e.g., 'gaei')
        const existing = await Industry.findByPk(req.body.id);
        if (existing) {
            return res.status(400).json({ message: 'Industry ID already exists' });
        }
        
        const industry = await Industry.create(req.body);
        res.status(201).json(industry);
    } catch (error) {
        console.error("Error creating industry:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateIndustry = async (req, res) => {
    try {
        const industry = await Industry.findByPk(req.params.id);
        if(industry) {
            await industry.update(req.body);
            res.status(200).json(industry);
        } else {
            res.status(404).json({ message: 'Industry not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { getAllIndustries, getIndustryById, createIndustry, updateIndustry };
