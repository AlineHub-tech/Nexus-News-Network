const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  
  // Uru rutonde rwavuguruwe rugahura na AuthorDashboard.jsx
  category: { 
    type: String, 
    required: true, 
    enum: ['Politics', 'Life', 'Entertainment', 'Culture', 'Education', 'Business', 'Opinion', 'Sport', 'TV', 'Community'] 
  },
  
  author: { type: String, required: true }, // Izina ry'umwanditsi
  mediaUrl: { type: String }, // Umuhora (URL) w'ifoto cyangwa video
  mediaType: { type: String, enum: ['image', 'video'] },
  status: { type: String, enum: ['pending', 'approved', 'draft', 'deleted'], default: 'pending' },
},
{
  timestamps: true // Ibi bitanga createdAt na updatedAt automatic
});

module.exports = mongoose.model('Article', ArticleSchema);
