// backend/models.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.Mixed, // Adjust according to your needs
  },
});

module.exports = mongoose.model('Job', jobSchema);
