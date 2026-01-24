const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['writer', 'admin'], default: 'writer' },
  // createdAt: { type: Date, default: Date.now }, <-- Iri rishobora gukurwaho
},
{
  timestamps: true // Ibi biyongeraho automatic 'createdAt' na 'updatedAt' fields
});

module.exports = mongoose.model('User', UserSchema);
