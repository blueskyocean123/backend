const express = require('express');
const updateAcsToken = require('../../redis/refresher');
const router = express.Router();
const checkCtrl = require('../../redis/checker');

// POST http://localhost:4036/user/token/refresh (body => email, role, name)
router.post('/refresh', checkCtrl.verifyRefToken, updateAcsToken);

module.exports = router;