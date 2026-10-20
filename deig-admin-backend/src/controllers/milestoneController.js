
const { Milestone } = require('../models');

exports.getAllMilestones = async (req, res) => {
    try {
        const milestones = await Milestone.findAll({ order: [['year', 'ASC']] });
        res.json(milestones);
    } catch (error) {
        res.status(500).json({ message: "Error fetching milestones", error: error.message });
    }
};

exports.createMilestone = async (req, res) => {
    try {
        const milestone = await Milestone.create(req.body);
        res.status(201).json(milestone);
    } catch (error) {
        res.status(500).json({ message: "Error creating milestone", error: error.message });
    }
};

exports.updateMilestone = async (req, res) => {
    try {
        const milestone = await Milestone.findByPk(req.params.id);
        if (!milestone) return res.status(404).json({ message: "Milestone not found" });
        await milestone.update(req.body);
        res.json({ message: "Milestone updated" });
    } catch (error) {
        res.status(500).json({ message: "Error updating milestone", error: error.message });
    }
};

exports.deleteMilestone = async (req, res) => {
    try {
        const milestone = await Milestone.findByPk(req.params.id);
        if (!milestone) return res.status(404).json({ message: "Milestone not found" });
        await milestone.destroy();
        res.json({ message: "Milestone deleted" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting milestone", error: error.message });
    }
};
