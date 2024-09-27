const Treatment = require('../model/Treatment');
const fs = require('fs');
const path = require('path');

// Create a new treatment
exports.createTreatment = async (req, res) => {
  try {
    const {
      title,
      description,
      symptoms,
      causes,
      treatmentOptions,
      homeRemedies,
      exercises,
      faqs,
    } = req.body;

    let newTreatment = new Treatment({
      title,
      description,
      symptoms,
      causes,
      treatmentOptions,
      homeRemedies,
      exercises,
      faqs: JSON.parse(faqs),
      image: req.file ? req.file.filename : null,
    });

    const savedTreatment = await newTreatment.save();
    res.status(201).json(savedTreatment);
  } catch (error) {
    console.error('Error creating treatment:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Update an existing treatment
exports.updateTreatment = async (req, res) => {
  try {
    const {
      title,
      description,
      symptoms,
      causes,
      treatmentOptions,
      homeRemedies,
      exercises,
      faqs,
    } = req.body;

    const treatmentId = req.params.id;

    let updatedTreatment = {
      title,
      description,
      symptoms,
      causes,
      treatmentOptions,
      homeRemedies,
      exercises,
      faqs: JSON.parse(faqs),
    };

    if (req.file) {
      updatedTreatment.image = req.file.filename;

      // Remove old image if exists
      const treatment = await Treatment.findById(treatmentId);
      if (treatment.image) {
        fs.unlinkSync(path.join(__dirname, `../upload/${treatment.image}`));
      }
    }

    const updated = await Treatment.findByIdAndUpdate(treatmentId, updatedTreatment, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: 'Treatment not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating treatment:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a treatment
exports.deleteTreatment = async (req, res) => {
  try {
    const treatmentId = req.params.id;

    const deleted = await Treatment.findByIdAndDelete(treatmentId);

    if (!deleted) {
      return res.status(404).json({ error: 'Treatment not found' });
    }

    // Remove associated image if exists
    if (deleted.image) {
      fs.unlinkSync(path.join(__dirname, `../upload/${deleted.image}`));
    }

    res.json({ message: 'Treatment deleted successfully' });
  } catch (error) {
    console.error('Error deleting treatment:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find().sort({ createdAt: -1 });
    res.json(treatments);
  } catch (error) {
    console.error('Error fetching treatments:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTreatmentById = async (req, res) => {
  try {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment) {
      return res.status(404).json({ error: 'Treatment not found' });
    }
    res.json(treatment);
  } catch (error) {
    console.error('Error fetching treatment:', error);
    res.status(500).json({ error: 'Server error' });
  }
};