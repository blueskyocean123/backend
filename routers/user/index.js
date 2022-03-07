const express = require('express');
const authRouter = require('./auth');
const oauthRouter = require('./oauth');
const profileRouter = require('./profile');
const refresherRouter = require('./tokenRefresher');
const followRouter = require('./follow');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/oauth', oauthRouter);
router.use('/profile', profileRouter);
router.use('/token', refresherRouter);
router.use('/follow', followRouter);

module.exports = router;