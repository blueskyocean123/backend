const express = require('express');
const commentCtrl = require('../../controllers/blog/comment');
const checkCtrl = require('../../redis/checker');

const router = express.Router();

// POST http://localhost:4036/blog/comment/create (content, userId, postId)
router.post('/create', checkCtrl.verifyAcsToken, commentCtrl.createComment);

// GET http://localhost:4036/blog/comment/read/?blogId=...
router.get('/read', checkCtrl.verifyAcsToken, commentCtrl.readComment);

// POST http://localhost:4036/blog/comment/update
router.post('/update', checkCtrl.verifyAcsToken, commentCtrl.updateComment);

// DELETE http://localhost:4036/blog/comment/delete
router.delete('/delete', checkCtrl.verifyAcsToken, commentCtrl.deleteComment);

module.exports = router;