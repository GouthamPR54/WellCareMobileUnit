const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  address: { type: String, required: true },
  pinCode: { type: String, required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  service: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  progress: { type: Number, default: 0 },
  pain: { type: String, default: '' }, 
  week: { type: String, default: '' }, 
  lastExam: { type: Date, default: null }, 
  nextTherapy: { type: Date, default: null },
});

module.exports = mongoose.model('Booking', bookingSchema);
