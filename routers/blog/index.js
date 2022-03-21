const express = require('express');
const blogCtrl = require('../../controllers/blog');
const checkCtrl = require('../../redis/checker');
const commentRouter = require('./comment');
const clapRouter = require('./clap');
const searchRouter = require('./search');
const tagRouter = require('./tag');

const router = express.Router();

router.use('/comment', commentRouter);
router.use('/clap', clapRouter);
router.use('/search', searchRouter);
router.use('/tag', tagRouter);

// POST http://localhost:4036/blog/create
router.post('/create', checkCtrl.verifyAcsToken, blogCtrl.createBlog);

// GET http://localhost:4036/blog/read/?blogId=...
router.get('/read', checkCtrl.verifyAcsToken, blogCtrl.readBlog);

// POST http://localhost:4036/blog/update
router.post('/update', checkCtrl.verifyAcsToken, blogCtrl.updateBlog);

// POST http://localhost:4036/blog/delete
router.post('/delete', checkCtrl.verifyAcsToken, blogCtrl.deleteBlog);

// GET http://localhost:4036/blog/getGoodBlogs
router.get('/getGoodBlogs', blogCtrl.getGoodBlogs);

// GET http://localhost:4036/blog/getMyBlogs
router.get('/getMyBlogs', checkCtrl.verifyAcsToken, blogCtrl.getMyBlogs);

// GET http://localhost:4036/blog/getFollowBlogs
router.get('/getFollowBlogs', checkCtrl.verifyAcsToken, blogCtrl.getFollowBlogs);

// GET http://localhost:4036/blog/getOtherBlogs/?userId=...
router.get('/getOtherBlogs', checkCtrl.verifyAcsToken, blogCtrl.getOtherBlogs);

module.exports = router;