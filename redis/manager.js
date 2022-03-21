const jwt = require('jsonwebtoken');
const redisClient = require('./connector');
const secret = 'firsttoken';

module.exports ={
    updateAcsToken: async (req, res) => {
        const payload = {
            id: req.id
        }
        const newAcsToken = await jwt.sign(payload, secret, {
            algorithm: 'HS256',
            expiresIn: '1d'
        });
        return res.json({
            status: true, 
            message: "success", 
            data: {newAcsToken}
        });
    },
    deleteRefToken: async (req, res) => {
        await redisClient.del(req.id.toString());
        return res.json({
            status: true, 
            message: "success."
        });
    }
}