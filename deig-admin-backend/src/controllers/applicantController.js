
const { Applicant } = require('../models');
const mediaService = require('../services/mediaService');

// For public, general applications
exports.createPublicApplicant = async (req, res) => {
    try {
        const { name, email } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'CV attachment is required.' });
        }

        // Handle CV upload
        const cvFile = await mediaService.handleFileUpload(req.file, null); // null user for public uploads

        const newApplicant = await Applicant.create({
            name,
            email,
            cvUrl: cvFile.url,
            vacancyId: null // This signifies a general application
        });
        res.status(201).json(newApplicant);
    } catch (error) {
        res.status(500).json({ message: "Error submitting application", error: error.message });
    }
};

// Placeholder for all CRUD operations

exports.getAllApplicants = async (req, res) => {
    try {
        const applicants = await Applicant.findAll();
        res.json(applicants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching applicants", error: error.message });
    }
};

exports.getApplicantsByVacancy = async (req, res) => {
    try {
        const applicants = await Applicant.findAll({ where: { vacancyId: req.params.vacancyId }});
        res.json(applicants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching applicants for vacancy", error: error.message });
    }
};

exports.getApplicantById = async (req, res) => {
    try {
        const applicant = await Applicant.findByPk(req.params.id);
        if (!applicant) return res.status(404).json({ message: "Applicant not found" });
        res.json(applicant);
    } catch (error) {
        res.status(500).json({ message: "Error fetching applicant", error: error.message });
    }
};

exports.createApplicant = async (req, res) => {
    // This would typically be a public route with file handling for CV
    try {
        const newApplicant = await Applicant.create(req.body);
        res.status(201).json(newApplicant);
    } catch (error) {
        res.status(500).json({ message: "Error creating applicant", error: error.message });
    }
};

exports.updateApplicant = async (req, res) => {
     try {
        const applicant = await Applicant.findByPk(req.params.id);
        if (!applicant) return res.status(404).json({ message: "Applicant not found" });
        // Only allow updating status, notes, rating
        const { status, notes, rating } = req.body;
        await applicant.update({ status, notes, rating });
        res.json({ message: "Applicant updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating applicant", error: error.message });
    }
};

exports.deleteApplicant = async (req, res) => {
    try {
        const applicant = await Applicant.findByPk(req.params.id);
        if (!applicant) return res.status(404).json({ message: "Applicant not found" });
        await applicant.destroy();
        res.json({ message: "Applicant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting applicant", error: error.message });
    }
};