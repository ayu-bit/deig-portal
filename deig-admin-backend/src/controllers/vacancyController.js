
const { Vacancy } = require('../models');

// Placeholder for all CRUD operations

exports.getAllVacancies = async (req, res) => {
    try {
        const { status } = req.query;
        const where = {};
        if (status) {
            where.status = status;
        }
        const vacancies = await Vacancy.findAll({ where });
        res.json(vacancies);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vacancies", error: error.message });
    }
};

exports.getVacancyById = async (req, res) => {
    try {
        const vacancy = await Vacancy.findByPk(req.params.id);
        if (!vacancy) return res.status(404).json({ message: "Vacancy not found" });
        res.json(vacancy);
    } catch (error) {
        res.status(500).json({ message: "Error fetching vacancy", error: error.message });
    }
};

exports.createVacancy = async (req, res) => {
    try {
        const newVacancy = await Vacancy.create(req.body);
        res.status(201).json(newVacancy);
    } catch (error) {
        res.status(500).json({ message: "Error creating vacancy", error: error.message });
    }
};

exports.updateVacancy = async (req, res) => {
     try {
        const vacancy = await Vacancy.findByPk(req.params.id);
        if (!vacancy) return res.status(404).json({ message: "Vacancy not found" });
        await vacancy.update(req.body);
        res.json({ message: "Vacancy updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating vacancy", error: error.message });
    }
};

exports.deleteVacancy = async (req, res) => {
    try {
        const vacancy = await Vacancy.findByPk(req.params.id);
        if (!vacancy) return res.status(404).json({ message: "Vacancy not found" });
        await vacancy.destroy();
        res.json({ message: "Vacancy deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting vacancy", error: error.message });
    }
};
