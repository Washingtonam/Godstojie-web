const express = require('express');
const { handleConsultationRequest, getLeads, updateLead } = require('../controllers/leadController');
const { login } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/leads', handleConsultationRequest);
router.get('/leads', authenticate, getLeads);
router.patch('/leads/:id', authenticate, updateLead);

module.exports = router;
