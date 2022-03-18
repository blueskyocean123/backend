const models = require('../../models');

const followCtrl = {
    createFollow: async (req, res) => {
        await models.follow.create({
            sender: req.id,
            receiver: req.body.userId
        })
        .then((createdFollow) => {
            res.status(200).send({
                msg: "existed"
            });
        })
        .catch((err) => {
            console.log('create error : ', err);
        });
    },
    deleteFollow: async (req, res) => {
        await models.follow.destroy({
            where: {
                sender: req.id,
                receiver: req.body.userId
            }
        })
        .then((deletedFollow) => {
            res.status(200).send({
                msg: "non-existed"
            });
        })
        .catch((err) => {
            console.log('delete error : ', err);
        });
    },
    checkFollow: async (req, res) => {
        await models.follow.findOne({
            where: {
                sender: req.id,
                receiver: req.query.userId
            }
        })
        .then((foundFollow) => {
            if (foundFollow) {
                res.status(200).send({
                    msg: "existed"
                });
            } else {
                res.status(201).send({
                    msg: "non-existed"
                });
            }            
        })
        .catch((err) => {
            console.log('create error : ', err);
        });
    },
    // get the list of users that you follow
    getFollow: async (req, res) => {
        await models.follow.findAll({
            include: [
                {
                    model: models.user,
                    as: "receiver_user",
                    required:false
                }
            ],
            where: {
                sender: req.id
            }
        })
        .then((foundFollows) => {
            res.status(200).send(foundFollows);
        })
        .catch((err) => {
            console.log('comment read error : ', err);
        });
    }
}

module.exports = followCtrl;