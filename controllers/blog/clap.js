const models = require('../../models');

const clapCtrl = {
    createClap : async (req, res) => {
        await models.clap.create({
            createdBy: req.id,
            blog_id: req.body.blogId
        })
        .then((createdClap) => {
            res.status(200).send({
                msg: "success"
            });
        })
        .catch((err) => {
            console.log('create error : ', err);
        });
    },
    getClapNum: async (req, res) => {
        await models.clap.findAll({
            where: {
                blog_id: req.query.blogId
            }
        })
        .then((foundClap) => {
            res.status(200).send({
                msg: foundClap.length
            });
        })
        .catch((err) => {
            console.log('select error : ', err);
        });
    },
    checkClap: async (req, res) => {
        await models.clap.findAll({
            where: {
                blog_id: req.query.blogId,
                createdBy: req.id
            }
        })
        .then((foundClap) => {
            res.status(200).send({
                msg: foundClap.length
            });
        })
        .catch((err) => {
            console.log('check error : ', err);
        });
    }
}

module.exports = clapCtrl;