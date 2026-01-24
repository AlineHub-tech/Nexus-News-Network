const mongoose = require('mongoose');

const AdSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  videoUrl: { type: String },
  isActive: { type: Boolean, default: true },
  // createdAt: { type: Date, default: Date.now }, <-- Iri rishobora gukurwaho
}, 
{
  timestamps: true // Ibi biyongeraho automatic 'createdAt' na 'updatedAt' fields
});

module.exports = mongoose.model('Ads', AdSchema);
