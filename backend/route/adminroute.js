const express = require('express');
const { loginAdmin } = require('../controller/admincontroller');
const router = express.Router();

router.post('/login', loginAdmin);

module.exports = router;
