const express = require('express');
const router = express.Router();
const formController = require('../controller/formController');

router.post('/submit', formController.submitForm);

module.exports = router;
