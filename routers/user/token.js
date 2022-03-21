const express = require('express');
const jwtoken = require('../../redis/manager');
const router = express.Router();
const checkCtrl = require('../../redis/checker');

// POST http://localhost:4036/user/token/refresh (body => email, name)
router.post('/refresh', checkCtrl.verifyRefToken, jwtoken.updateAcsToken);

// POST http://localhost:4036/user/token/delete 
router.post('/delete', checkCtrl.verifyAcsToken, jwtoken.deleteRefToken)

module.exports = router;