const models = require('../../models');

const profileCtrl = {
    readDetails: async (req, res) => {
        await models.user.findOne({ 
            where: 
            { 
                id: req.id
            }
        })
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((err) => {
            res.status(401).send({
                ok: false,
                message: 'token is incorrect'
            });  
        });
    },
    updateDetails: async (req, res) => {
        await models.user.update({ 
            name: req.body.name, 
            photo: req.body.photo,
            bio: req.body.bio, 
            email: req.body.email
        }, { 
            where: { 
                id: req.id 
            }
        })
        .then((r) => {
            res.status(200).send({
                ok: true,
                message: 'Your profile update is successfully!'
            });
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

module.exports = profileCtrl;