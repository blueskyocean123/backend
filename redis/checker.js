const redisClient = require('./connector');
const jwt = require('jsonwebtoken');
const secret = 'firsttoken';

const checkCtrl = {
    verifyAcsToken: (req, res, next) => {
        try {
            var acsToken = null;
            if (req.headers['x-access-token']) {
                acsToken = req.headers['x-access-token'];
            } else {
                return res.status(401).json({
                    status: false, 
                    message: "Invalid request."
                });
            }                
            const decoded = jwt.verify(acsToken, secret);
            req.id = decoded.id;    
            req.token = acsToken;
            redisClient.get('BL_' + decoded.id.toString(), (err, data) => {
                if(err) throw err;
                if(acsToken === data) return res.status(401).json({
                    status: false, 
                    message: "blacklisted token."
                });
                next();
            })
        } catch (error) {
            return res.status(401).json({
                status: false, 
                message: "Your session is not valid.", 
                data: error
            });
        }        
    },
    verifyRefToken: (req, res, next) => {
        var refToken = null;
        if (req.headers['x-refresh-token']) {
            refToken = req.headers['x-refresh-token'];
        } else {
            return res.status(401).json({
                status: false, 
                message: "Invalid request."
            });
        }
        try {
            const decoded = jwt.verify(refToken, secret);
            req.id = decoded.id;

            redisClient.get(decoded.id.toString(), (err, data) => {
                if (err) throw err;
                if (data === null) 
                    return res.status(401).json({
                        status: false, 
                        message: "Invalid request. Token is not in store."
                    });
                if (JSON.parse(data).token != refToken) 
                    return res.status(401).json({
                        status: false, 
                        message: "Invalid request. Token is not same in store."
                    });
                next();
            })
        } catch (error) {
            return res.status(401).json({
                status: true, 
                message: "Your session is not valid.", 
                data: error
            });
        }
    }
}

module.exports = checkCtrl;