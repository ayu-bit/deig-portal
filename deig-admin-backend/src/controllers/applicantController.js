
const { Applicant } = require('../models');

// @desc    Get all applicants for a vacancy
const getApplicantsByVacancy = async (req, res) => {
  try {
    const applicants = await Applicant.findAll({ 
        where: { vacancyId: req.params.vacancyId },
        order: [['createdAt', 'DESC']]
    });
    res.status(200).json(applicants);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching applicants', error: error.message });
  }
};

// @desc    Create a new applicant
const createApplicant = async (req, res) => {
    try {
        const { name, email, vacancyId } = req.body;
        // Construct full URL for the uploaded file if it exists
        const baseUrl = process.env.APP_URL || `http://localhost:${process.env.PORT || 5001}`;
        const cvUrl = req.file ? `${baseUrl}/uploads/${req.file.filename}` : null;

        const applicant = await Applicant.create({
            name,
            email,
            vacancyId: parseInt(vacancyId) || 0, // Ensure ID matches model type (Integer in Sequelize)
            cvUrl,
            status: 'New',
            appliedDate: new Date()
        });
        res.status(201).json(applicant);
    } catch (error) {
        res.status(500).json({ message: 'Server error creating applicant', error: error.message });
    }
};

// @desc    Update applicant status
const updateApplicantStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const applicant = await Applicant.findByPk(req.params.id);
    if (applicant) {
        applicant.status = status;
        await applicant.save();
        res.status(200).json(applicant);
    } else {
        res.status(404).json({ message: 'Applicant not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error updating applicant status', error: error.message });
  }
};

module.exports = {
  getApplicantsByVacancy,
  createApplicant,
  updateApplicantStatus,
};
