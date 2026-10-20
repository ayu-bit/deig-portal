
const { Vacancy, Applicant } = require('../models');

// @desc    Get all vacancies with applicant counts
const getAllVacancies = async (req, res) => {
  try {
    const vacancies = await Vacancy.findAll({
        order: [['createdAt', 'DESC']]
    });
    
    // Calculate counts (doing this in JS for simplicity, could be a subquery)
    const vacanciesWithCounts = await Promise.all(
        vacancies.map(async (vacancy) => {
            const applicantCount = await Applicant.count({ where: { vacancyId: vacancy.id } });
            return { ...vacancy.toJSON(), applicantCount };
        })
    );
    res.status(200).json(vacanciesWithCounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching vacancies', error: error.message });
  }
};

// @desc    Create a vacancy
const createVacancy = async (req, res) => {
  try {
    const savedVacancy = await Vacancy.create(req.body);
    res.status(201).json(savedVacancy);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating vacancy', error: error.message });
  }
};

// @desc    Update a vacancy
const updateVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id);
    if (vacancy) {
        await vacancy.update(req.body);
        res.status(200).json(vacancy);
    } else {
        res.status(404).json({ message: 'Vacancy not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error updating vacancy', error: error.message });
  }
};

// @desc    Delete a vacancy
const deleteVacancy = async (req, res) => {
  try {
    const vacancy = await Vacancy.findByPk(req.params.id);
    if (vacancy) {
        await vacancy.destroy();
        // Also delete associated applicants
        await Applicant.destroy({ where: { vacancyId: req.params.id } });
        res.status(200).json({ message: 'Vacancy removed' });
    } else {
        res.status(404).json({ message: 'Vacancy not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting vacancy', error: error.message });
  }
};

module.exports = {
  getAllVacancies,
  createVacancy,
  updateVacancy,
  deleteVacancy,
};
