const express = require('express');
const authCtrl = require('../../controllers/user/auth');

const router = express.Router();

// POST http://localhost:4036/user/auth/signup (body => email, role, name)
router.post('/signup', authCtrl.signupSendMail);

// GET http://localhost:4036/user/auth/signup/?authcode=...&email=...
router.get('/signup', authCtrl.authWorkEnd);

// POST http://localhost:4036/user/auth/login (body => email)
router.post('/login', authCtrl.loginSendMail);

// GET http://localhost:4036/user/auth/login/?authcode=...&email=...
router.get('/login', authCtrl.authWorkEnd);

module.exports = router;