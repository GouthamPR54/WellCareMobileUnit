const Booking = require('../model/Booking');

// Create a new booking
exports.createBooking = async (req, res) => {
  try {
    console.log(req.user.id,67890987)
    const booking = new Booking({
      ...req.body,
      user: req.user.id  
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all bookings for admin or user-specific bookings
exports.getBookings = async (req, res) => {
  try {
    let bookings;
    if (req.user.isAdmin) {
      bookings = await Booking.find();
    } else {
      bookings = await Booking.find({ user: req.user.id });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id, status } = req.params;
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update booking progress and additional fields
exports.updateBookingProgress = async (req, res) => {
  const { id } = req.params;
  const { progress, pain, week, lastExam, nextTherapy } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      id,
      { progress, pain, week, lastExam, nextTherapy },
      { new: true } // Return the updated booking
    );
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error });
  }
};
