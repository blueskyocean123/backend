const jwt = require('jsonwebtoken');
const redisClient = require('./connector');
const secret = 'firsttoken';

module.exports = {
    genAcsToken: (user) => {
        const payload = {
            id: user.id
        };
        return jwt.sign(payload, secret, {
            algorithm: 'HS256',
            expiresIn: 3
        });
    },
    genRefToken: (user) => {
        const payload = {
            id: user.id
        };
        const refreshToken = jwt.sign(payload, secret, {
            algorithm: 'HS256',
            expiresIn: 60 * 60 * 2 
        });
        redisClient.get(user.id.toString(), (err, data) => {
            if(err) throw err;
            redisClient.set(user.id.toString(), JSON.stringify({
                token: refreshToken
            }));
        })
        return refreshToken;
    }
}