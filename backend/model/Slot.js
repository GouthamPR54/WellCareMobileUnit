const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  timeSlot: {
    type: String,
    required: true,
  },
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;
