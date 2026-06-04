const Lead = require('../models/Lead');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.handleConsultationRequest = async (req, res) => {
  try {
    const { clientName, clientPhone, preferredTime, projectId, projectName } = req.body;

    if (!clientName || !clientPhone) {
      return res.status(400).json({ message: 'Client name and phone are required.' });
    }

    const lead = await Lead.create({
      clientName,
      clientPhone,
      preferredTime,
      projectId,
      projectName,
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.LEAD_ALERT_EMAIL,
      subject: `New consultation request for ${projectName || 'a project'}`,
      text: `A new lead has been captured:\n\nName: ${clientName}\nPhone: ${clientPhone}\nPreferred time: ${preferredTime || 'Not provided'}\nProject: ${projectName || 'Unknown'}\n\nReview the lead in the admin portal or contact them directly.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Lead captured successfully.', lead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to capture lead. Please try again later.' });
  }
};

exports.getLeads = async (req, res) => {
  try {
    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.status(200).json({ leads });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to retrieve leads.' });
  }
};

exports.updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!status && notes === undefined) {
      return res.status(400).json({ message: 'Nothing to update.' });
    }

    const updatePayload = {};
    if (status) updatePayload.status = status;
    if (notes !== undefined) updatePayload.notes = notes;

    const lead = await Lead.findByIdAndUpdate(id, updatePayload, { new: true });

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found.' });
    }

    res.status(200).json({ message: 'Lead updated successfully.', lead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Unable to update lead.' });
  }
};
