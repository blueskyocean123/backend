const jwt = require('jsonwebtoken');
const secret = 'firsttoken';

const updateAcsToken = (req, res) => {
    const payload = {
        id: req.id
    }
    const newAcsToken = jwt.sign(payload, secret, {
        algorithm: 'HS256',
        expiresIn: 3
    });
    return res.json({
        status: true, 
        message: "success", 
        data: {newAcsToken}
    });
};

module.exports = updateAcsToken;