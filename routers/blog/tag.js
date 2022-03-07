const express = require('express');
const tagCtrl = require('../../controllers/blog/tag');
const checkCtrl = require('../../redis/checker');

const router = express.Router();

// POST http://localhost:4036/blog/tag/create (blogId, tags)
router.post('/create', checkCtrl.verifyAcsToken, tagCtrl.createTag);

// GET http://localhost:4036/blog/tag/sort
router.get('/sort', checkCtrl.verifyAcsToken, tagCtrl.sortTag);

// GET http://localhost:4036/blog/tag/init
router.post('/init', checkCtrl.verifyAcsToken, tagCtrl.deleteClassify);

// GET http://localhost:4036/blog/tag/get/?blogId=...
router.get('/get', checkCtrl.verifyAcsToken, tagCtrl.getTag);

module.exports = router;