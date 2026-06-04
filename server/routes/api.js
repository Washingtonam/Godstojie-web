const express = require('express');
const { handleConsultationRequest } = require('../controllers/leadController');

const router = express.Router();

router.post('/leads', handleConsultationRequest);

module.exports = router;
