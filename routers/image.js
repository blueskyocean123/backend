const express = require('express');
const imageCtrl = require('../controllers/image');

const router = express.Router();

// POST http://localhost:4036/image/upload (body => email, role, name)
router.post('/upload', imageCtrl.uploadImage);

module.exports = router;