const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Ads = require('../models/Ads'); 

// GET /api/public/articles: Reba inkuru zose zemejwe (Landing page)
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET /api/public/articles/:id: Reba inkuru imwe rukumbi (Single Article View)
router.get('/articles/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);

        if (!article || article.status !== 'approved') {
            return res.status(404).json({ msg: 'Inkuru ntabonetse cyangwa ntiremezwa' });
        }

        res.json(article);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Inkuru ntabonetse' });
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// >>>>> ONGERAHO IYI ROUTE KUGIRA NGO CATEGORY ZIKORE NEZA: <<<<<
// GET /api/public/articles/category/:categoryName: Reba inkuru zose za category runaka
router.get('/articles/category/:categoryName', async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        // Dukoresha RegExp kugira ngo Category iboneke niyo yaba itandukanye gato (e.g. Sport vs sport)
        const articles = await Article.find({ 
            status: 'approved', 
            category: new RegExp(categoryName, 'i') 
        }).sort({ createdAt: -1 });
        res.json(articles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error fetching category');
    }
});


// GET /api/public/tv: Reba inkuru za TV gusa (zifite video)
router.get('/tv', async (req, res) => {
    try {
      const tvArticles = await Article.find({ status: 'approved', category: 'TV', mediaType: 'video' }).sort({ createdAt: -1 });
      res.json(tvArticles);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
});

// GET /api/public/ads: Reba Ads zose zikora (YAKOSOWE NEZA)
router.get('/ads', async (req, res) => {
    try {
      const ads = await Ads.find({ isActive: true }).sort({ createdAt: -1 }); 
      res.json(ads);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error: Failed to fetch public ads');
    }
});

module.exports = router;
