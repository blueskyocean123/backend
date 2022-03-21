const models = require('../../models');
const jwtoken = require('../../redis/generator');
const oauth = require('../../utils/oauthManager');

const oauthCtrl = {
    loginWorkEnd: async (req, res) => {
        const coperation = 'google';
        const code = req.body.code;
        const options = oauth.getOption(coperation, code);
        const token = await oauth.getAccessToken(options);
        const newUser = await oauth.getUserInfo(options.userInfoUrl, token.access_token);

        await models.user.findOne({ 
            where: { 
                email: newUser.email 
            }
        })
        .then((foundUser) => {
            if (foundUser) {
                const accessToken = jwtoken.genAcsToken(foundUser);
                const refreshToken = jwtoken.genRefToken(foundUser);
                res.status(200).send({
                    ok: true,
                    data: {
                        accessToken,
                        refreshToken,
                        foundUser
                    },
                    message: 'OAuth success'
                });
            } else {
                res.status(202).send({
                    ok: false,
                    message: 'Sign up at first.'
                })
            }
        })
        .catch((err) => {
            res.status(402).send({
                ok: false,
                message: 'Database connection error occurred'
            })
        });
    },
    signupWorkEnd: async (req, res) => {
        const coperation = 'google';
        const code = req.param('code');
        const options = oauth.getOption(coperation, code);
        const token = await oauth.getAccessToken(options);
        const newUser = await oauth.getUserInfo(options.userInfoUrl, token.access_token);

        await models.user.findOne({ 
            where: { 
                email: newUser.email 
            }
        })
        .then((foundUser) => {
            var lastUser = null;
            if (foundUser) {
                lastUser = foundUser;
            } else {
                models.user.create({
                    email: newUser.email, 
                    is_activated: 1,
                    role: 2,
                    name: newUser.name,
                    photo: newUser.picture
                })
                .then((createdUser) => {
                    lastUser = createdUser;
                    const accessToken = jwtoken.genAcsToken(foundUser);
                    const refreshToken = jwtoken.genRefToken(foundUser);
                    res.status(200).send({
                        ok: true,
                        data: {
                            accessToken,
                            refreshToken
                        },
                        message: 'OAuth success'
                    });
                })
                .catch((err) => {
                    console.log('err: ' + err);
                })
            }            
        })
        .catch((err) => {
            res.status(402).send({
                ok: false,
                message: 'Database connection error occurred'
            })
        });
    }
}

module.exports = oauthCtrl