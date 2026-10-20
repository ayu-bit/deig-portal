const mongoose = require('mongoose');

const ApplicantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  vacancy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vacancy',
    required: true,
  },
  status: {
    type: String,
    enum: ['New', 'Reviewed', 'Interview', 'Hired', 'Rejected'],
    default: 'New',
  },
  cvUrl: String,
  notes: [{
    content: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Applicant', ApplicantSchema);
