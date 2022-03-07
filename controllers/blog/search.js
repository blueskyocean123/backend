const models = require('../../models');
const { Op } = require('sequelize');

const searchCtrl = {
    blogTopic : async (req, res) => {
        await models.blog.findAll({
            include: [
                {
                    model: models.user,
                    as: "createdBy_user",
                    required:false
                }
            ],
            where: {
                topic: {
                    [Op.like]: '%' + req.query.keyword + '%'
                }
            }
        })
        .then((foundBlog) => {
            res.status(200).send({
                foundBlog
            });
        })
        .catch((err) => {
            console.log('select error : ', err);
        });
    },
    blogContent: async (req, res) => {
        await models.blog.findAll({
            include: [
                {
                    model: models.user,
                    as: "createdBy_user",
                    required:false
                }
            ],
            where: {
                content: {
                    [Op.like]: '%' + req.query.keyword + '%'
                }
            }
        })
        .then((foundBlog) => {
            res.status(200).send({
                foundBlog
            });
        })
        .catch((err) => {
            console.log('select error : ', err);
        });
    },
    userBionote: async (req, res) => {
        await models.user.findAll({
            include: [
                {
                    model: models.follow,
                    as: "follows",
                    required: false
                }
            ],
            where: {
                bio: {
                    [Op.like]: '%' + req.query.keyword + '%'
                }
            }
        })
        .then((foundUser) => {
            res.status(200).send({
                foundUser
            });
        }) 
        .catch((err) => {
            console.log('select error : ', err);
        });
    },
    userName: async (req, res) => {
        await models.user.findAll({
            include: [
                {
                    model: models.follow,
                    as: "follows",
                    required: false
                }
            ]
        })
        .then((foundUser) => {
            res.status(200).send({
                foundUser
            });
        }) 
        .catch((err) => {
            console.log('select error : ', err);
        });
    },
    tagBlog: async (req, res) => {
        await models.tag.findAll({
            include: [
                {
                    model: models.classify,
                    as: "classifies",
                    required: false,
                    include: [
                        {
                            model: models.blog,
                            as: "blog",
                            required: false,
                            include: [
                                {
                                    model: models.user,
                                    as: "createdBy_user",
                                    required: false
                                }
                            ]
                        }
                    ]
                }
            ],
            where: {
                name: req.query.name
            }
        })
        .then((foundTags) => {
            res.status(200).send(foundTags);
        })
        .catch((err) => {
            console.log('comment read error : ', err);
        });
    },
    tag: async (req, res) => { 
        await models.tag.findAll({
            where: {
                name: {
                    [Op.like]: '%' + req.query.keyword + '%'
                }
            }
        })
        .then((foundTags) => {
            res.status(200).send(foundTags);
        })
        .catch((err) => {
            console.log('tag search error : ', err);
        });
    }
}

module.exports = searchCtrl;