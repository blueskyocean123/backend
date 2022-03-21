const models = require('../../models');
const sendMail = require('../../utils/sendmail').postMail;
const jwtoken = require('../../redis/generator');
const crypto = require('crypto');

var shasum = crypto.createHash('sha1');
shasum.update('first nodejs site');
var authcode = shasum.digest('hex');

const authCtrl = {
    loginSendMail : async (req, res) => {
        const users = await models.user.findOne({ 
            where: { 
                email: req.body.email 
            }
        })
        .then((user) => {
            const mailcontent = {
                authcode: authcode,
                email: req.body.email,
                type: 'login'
            }
            if (user) {
                sendMail(req.body.email, 'You are logged in now.', mailcontent);
                res.status(200).send({
                    ok: true,
                    message: 'Email sending'
                });
            } else {
                res.status(202).send({
                    ok: true,
                    message: 'Login failed.'
                });
            }
        })
        .catch((err) => {
            res.status(402).send({
                ok: true,
                message: 'Database connection error occurred.'
            });
        });
    },
    signupSendMail : async (req, res) => {
        await models.user.findOne({ 
            where: { 
                email: req.body.email 
            }
        })
        .then((foundUser) => {
            const mailcontent = {
                authcode: authcode,
                email: req.body.email,
                type: 'signup'
            }
            if (foundUser) {
                sendMail(req.body.email, 'You are signed up now.', mailcontent);
            } else {
                models.user.create({
                    name: 'New Username',
                    bio: 'bio information',
                    nickname: 'New Nickname',
                    url: 'https://newsite.com',
                    email: req.body.email, 
                    role: req.body.role, 
                    is_activated: 0,
                    photo: req.body.photo
                })
                .then(createdUser => {
                    sendMail(createdUser.email, 'Please confirm your details.', mailcontent);
                });
            }
            res.status(200).send({
                ok: true,
                message: 'Email sending'
            });
        })
        .catch((err) => {
            res.status(402).send({
                ok: true,
                message: 'Database connection error occurred.'
            });
        });
    },
    authWorkEnd: async (req, res) => {
        if (authcode === req.query.authcode) {
            await models.user.findOne({ 
                where: { 
                    email: req.query.email 
                }
            })
            .then((foundUser) => {
                if (foundUser) {
                    if (!foundUser.is_activated) {
                        models.user.update({ 
                            is_activated: 1 
                        }, { 
                            where: { 
                                email: foundUser.email 
                            }
                        })
                        .then(updatedUser => { })
                        .catch(err => {
                            console.log('err : ' + err);
                        });
                    }
                    const accessToken = jwtoken.genAcsToken(foundUser);
                    const refreshToken = jwtoken.genRefToken(foundUser);
                    res.status(200).send({
                        ok: true,
                        data: {
                            accessToken,
                            refreshToken
                        },
                        message: 'Auth success'
                    });
                } else {
                    res.status(401).send({
                        ok: false,
                        message: 'You are not registered.',
                    });
                }
            });
        } else {
            res.status(401).send({
                ok: false,
                message: 'This is insecure access.',
            });
        }
    }
}

module.exports = authCtrl;