const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Ads = require('../models/Ads'); 
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const multer = require('multer'); 
const path = require('path');

// Gutegura uburyo Multer ibika files
const storage = multer.diskStorage({
  destination: function (req, file, cb) { 
    cb(null, 'uploads/'); // !!! Genzura ko folder 'uploads' ihari mu muzi wa project !!!
  },
  filename: function (req, file, cb) { 
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); 
  }
});
const upload = multer({ storage: storage });


// POST /api/admin/articles: Admin yohereza inkuru nshya
router.post('/articles', [auth, admin, upload.single('mediaFile')], async (req, res) => {
  const { title, body, category, mediaType } = req.body;
  const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const newArticle = new Article({
      title, body, category, mediaUrl, mediaType,
      author: req.user.username, 
      status: 'approved', // Admin yashyizeho, ihita yemerwa
    });
    const article = await newArticle.save();
    res.status(201).json(article);
  } catch (err) {
    console.error(err.message); 
    res.status(500).send('Server Error');
  }
});


// POST /api/admin/ads: Kongeramo ad nshya
router.post('/ads', [auth, admin, upload.single('mediaFile')], async (req, res) => {
    const { title, description, mediaType } = req.body;
    const mediaUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const newAd = new Ads({ title, description, mediaUrl, mediaType, isActive: true });
        const savedAd = await newAd.save();
        res.status(201).json(savedAd);
    } catch (err) {
        console.error(err.message); 
        res.status(500).send('Server Error: Ad upload failed');
    }
});

// GET /api/admin/pending-articles: Kugarura inkuru zose zitarasuzumwa
router.get('/pending-articles', [auth, admin], async (req, res) => {
    try {
        const articles = await Article.find({ status: 'pending' }).sort({ date: -1 });
        res.json(articles);
    } catch (err) { 
        console.error(err.message); 
        res.status(500).send('Server Error'); 
    }
});

// GET /api/admin/approved-articles: Kugarura inkuru zose zemejwe (Niyo twari dukeneye)
router.get('/approved-articles', [auth, admin], async (req, res) => {
    try {
        const articles = await Article.find({ status: 'approved' }).sort({ date: -1 });
        res.json(articles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT /api/admin/articles/:id/approve: Kwemeza inkuru (Approve)
router.put('/articles/:id/approve', [auth, admin], async (req, res) => {
    try {
        const article = await Article.findByIdAndUpdate(
            req.params.id, 
            { status: 'approved' }, 
            { new: true }
        );
        if (!article) return res.status(404).json({ msg: 'Inkuru ntabonetse' });
        res.json(article);
    } catch (err) { 
        console.error(err.message); 
        res.status(500).send('Server Error'); 
    }
});

// DELETE /api/admin/articles/:id: Gusiba inkuru
router.delete('/articles/:id', [auth, admin], async (req, res) => {
    try {
        const article = await Article.findByIdAndDelete(req.params.id);
        if (!article) return res.status(404).json({ msg: 'Inkuru ntabonetse' });
        res.json({ msg: 'Inkuru yasibwe' });
    } catch (err) { 
        console.error(err.message); 
        res.status(500).send('Server Error'); 
    }
});


module.exports = router;
