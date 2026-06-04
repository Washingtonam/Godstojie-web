const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  clientPhone: { type: String, required: true },
  preferredTime: { type: String },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  projectName: { type: String },
  status: { type: String, default: 'New', enum: ['New', 'Contacted', 'Converted'] },
  notes: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Lead', leadSchema);
