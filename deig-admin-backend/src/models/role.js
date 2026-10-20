const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Admin', 'Editor', 'Industry Manager', 'HR Manager', 'Viewer'],
  },
  description: String,
  permissions: [{
    type: String,
  }],
});

module.exports = mongoose.model('Role', RoleSchema);
