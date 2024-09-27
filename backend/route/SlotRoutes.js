const express = require('express');
const { getAllSlots, saveOrUpdateSlot } = require('../controller/SlotController');

const router = express.Router();

router.get('/getAllSlots', getAllSlots);
router.post('/saveOrUpdateSlot', saveOrUpdateSlot);

module.exports = router;
