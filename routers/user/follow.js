const express = require('express');
const followCtrl = require('../../controllers/user/follow');
const checkCtrl = require('../../redis/checker');

const router = express.Router();

// POST http://localhost:4036/user/follow/create
router.post('/create', checkCtrl.verifyAcsToken, followCtrl.createFollow);

// POST http://localhost:4036/user/follow/delete
router.post('/delete', checkCtrl.verifyAcsToken, followCtrl.deleteFollow);

// GET http://localhost:4036/user/follow/check/?userId=...
router.get('/check', checkCtrl.verifyAcsToken, followCtrl.checkFollow);

// GET http://localhost:4036/user/follow/get
router.get('/get', checkCtrl.verifyAcsToken, followCtrl.getFollow);

module.exports = router;