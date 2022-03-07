const express = require('express');
const clapCtrl = require('../../controllers/blog/clap');
const checkCtrl = require('../../redis/checker');

const router = express.Router();

// POST http://localhost:4036/blog/clap/create (blogId)
router.post('/create', checkCtrl.verifyAcsToken, clapCtrl.createClap);

// GET http://localhost:4036/blog/clap/get/?blogId=...
router.get('/get', checkCtrl.verifyAcsToken, clapCtrl.getClapNum);

// POST http://localhost:4036/blog/clap/check (blogId)
router.get('/check', checkCtrl.verifyAcsToken, clapCtrl.checkClap);

module.exports = router;