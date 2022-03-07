const express = require('express');
const profileCtrl = require('../../controllers/user/profile');
const checkCtrl = require('../../redis/checker');

const router = express.Router();

// GET http://localhost:4036/user/profile/read/me
router.get('/read/me', checkCtrl.verifyAcsToken, profileCtrl.readDetails);

// POST http://localhost:4036/api/profile/update
router.post('/update/me', checkCtrl.verifyAcsToken, profileCtrl.updateDetails);

module.exports = router;