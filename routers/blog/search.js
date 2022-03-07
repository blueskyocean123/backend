const express = require('express');
const searchCtrl = require('../../controllers/blog/search');
const checkCtrl = require('../../redis/checker');

const router = express.Router();

// GET http://localhost:4036/blog/search/topic/?keyword=... (content, userId, postId)
router.get('/topic', checkCtrl.verifyAcsToken, searchCtrl.blogTopic);

// GET http://localhost:4036/blog/search/content/?keyword=...
router.get('/content', checkCtrl.verifyAcsToken, searchCtrl.blogContent);

// GET http://localhost:4036/blog/search/userbio/?keyword=...
router.get('/userbio', checkCtrl.verifyAcsToken, searchCtrl.userBionote);

// GET http://localhost:4036/blog/search/tag/?keyword=...
router.get('/tag', checkCtrl.verifyAcsToken, searchCtrl.tag);

// GET http://localhost:4036/blog/search/tagBlog/?name=...
router.get('/tagBlog', checkCtrl.verifyAcsToken, searchCtrl.tagBlog);

module.exports = router;
