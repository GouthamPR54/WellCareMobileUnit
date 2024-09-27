const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const treatmentController = require('../controller/TreatmentController');
const upload = require('../middleware/upload');


// Routes
router.get('/getAllTreatments/:id', treatmentController.getAllTreatments);
router.get('/getTreatment/:id', treatmentController.getTreatmentById);
router.post('/createTreatment', upload.single('image'), treatmentController.createTreatment);
router.put('/updateTreatment/:id', upload.single('image'), treatmentController.updateTreatment);
router.delete('/delete/:id', treatmentController.deleteTreatment);

module.exports = router;
