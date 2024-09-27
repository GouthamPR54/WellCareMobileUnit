const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
  },
  causes: {
    type: String,
  },
  treatmentOptions: {
    type: String,
  },
  homeRemedies: {
    type: String,
  },
  exercises: {
    type: String,
  },
  faqs: [{
    question: { type: String },
    answer: { type: String }
  }],
  image: {
    type: String,
  },
  status: {
    type: String,
    default: 'Active',
    enum: ['Active', 'Inactive'],
  },
  
}, { timestamps: true });

const Treatment = mongoose.model('Treatment', treatmentSchema);

module.exports = Treatment;
