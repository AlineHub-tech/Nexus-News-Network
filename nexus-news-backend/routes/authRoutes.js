const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth'); // Dukeneye middleware ya auth hano

// POST /api/auth/register: Kwiyandikisha (Admin/Writer creation)
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Umukoresha asanzwe abaho' });
    }

    user = new User({ username, email, password, role });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Gutanga JWT igihe cyo kwiyandikisha (Login automatic)
    const payload = { user: { id: user.id, username: user.username, role: user.role } };
    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }, // Byahindutse biva kuri 3600 biba '1h' (bisobanura kimwe)
      (err, token) => {
      if (err) throw err;
      res.status(201).json({ token }); // Status 201: Created
    });
  } catch (err) {
    console.error(err.message); // Byongeweho error logging
    res.status(500).send('Server error');
  }
});

// POST /api/auth/login: Kwinjira
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Amakuru yinjiye siyo (Invalid Credentials)' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Amakuru yinjiye siyo (Invalid Credentials)' });
      }
      
      // Gutanga JWT igihe cyo kwinjira
      const payload = { user: { id: user.id, username: user.username, role: user.role } };
      jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }, 
        (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message); // Byongeweho error logging
      res.status(500).send('Server error');
    }
});

// GET /api/auth/user: Kugarura amakuru y'umukoresha winjiye akoresheje token
// Iyi route ifasha frontend kumenya uwo umukoresha ari we (Admin/Writer) iyo paji yongeye gufunguka
router.get('/user', auth, async (req, res) => {
    try {
        // req.user yavuye muri auth middleware
        const user = await User.findById(req.user.id).select('-password'); // Gusiba password mu makuru agaruka
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
