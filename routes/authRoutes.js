const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Login Route
router.post('/login', login);

// Protected Routes
router.get('/admin', authMiddleware(['admin']), (req, res) => {
  res.json({ message: 'Admin access granted' });
});

router.get('/editor', authMiddleware(['editor']), (req, res) => {
  res.json({ message: 'Editor access granted' });
});

router.get('/user', authMiddleware(['user']), (req, res) => {
  res.json({ message: 'User access granted' });
});

module.exports = router;