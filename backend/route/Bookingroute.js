const express = require('express');
const router = express.Router();
const bookingController = require('../controller/Bookingcontroller');
const fetchAdmin = require('../middleware/fetchAdmin');

// Route to create a new booking
router.post('/bookings', fetchAdmin, bookingController.createBooking);

// Route to get all bookings
router.get('/bookings', fetchAdmin, bookingController.getBookings);
router.get('/bookings/getAllBookings', bookingController.getAllBookings);

// Route to update booking status
router.patch('/bookings/:id/:status', bookingController.updateBookingStatus);

router.put('/progress/:id',bookingController.updateBookingProgress);

router.get('/', bookingController.getAllBookings);



module.exports = router;
