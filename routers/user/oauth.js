const express  = require('express');
const oauthCtrl = require('../../controllers/user/oauth');

const router   = express.Router();

// http://localhost:4036/user/oauth/login/:coperation/?code=...
router.post('/login/:coperation', oauthCtrl.loginWorkEnd);

// http://localhost:4036/user/oauth/signup/:coperation/?code=...
router.post('/signup/google', oauthCtrl.signupWorkEnd);

module.exports = router;
