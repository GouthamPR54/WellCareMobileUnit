const express = require('express');
const router = express.Router();
const contactcontroller = require('../controller/Contactcontroller');

router.post('/submit', contactcontroller.submitForm);

// Route to fetch all submissions
router.get('/submissions', contactcontroller.getSubmissions);

module.exports = router;
