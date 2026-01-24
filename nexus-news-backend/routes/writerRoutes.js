const express = require('express');
const router = express.Router(); // Uku ni ko korosora umurongo wa 2
const multer = require('multer');
const path = require('path');
// Ongera uhindure inzira zikurikira zikwereke dosiye zawe ziriho neza:
const Article = require('../models/Article'); 
const auth = require('../middleware/auth'); 

// Multer configuration: Aho amadosiye abikwa
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Ongera umenye neza ko folder ya 'uploads/' ibaho
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// POST /api/writer/articles: Umwanditsi yohereza inkuru nshya
router.post('/articles', [auth, upload.single('mediaFile')], async (req, res) => {
  const { title, body, category, mediaType } = req.body;
  const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newArticle = new Article({
      title, 
      body, 
      category, 
      mediaUrl, 
      mediaType,
      author: req.user.username, 
      status: 'pending', 
    });
    const article = await newArticle.save();
    res.status(201).json(article);
  } catch (err) {
    console.error(err.message); 
    res.status(500).send('Server Error');
  }
});

// ... (Ongera izindi routes zawe hano) ...

module.exports = router;
