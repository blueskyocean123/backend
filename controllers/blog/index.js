const models = require('../../models');

const blogCtrl = {
    createBlog : async (req, res) => {
        await models.blog.create({
            topic: req.body.topic,
            content: req.body.content,
            createdBy: req.id,
            comment_id: 0
        })
        .then(async (createdBlog) => {
            await models.comment.create({
                content: '   ',
                createdBy: req.id,
                blog_id: createdBlog.id,
                lft: 1,
                rgt: 2,
                depth: 0
            })
            .then(createdComment => {
                models.blog.update({
                    comment_id: createdComment.id
                }, {
                    where: {
                        id: createdBlog.id
                    }
                })
                .then(updatedBlog => {
                    createdBlog.dataValues.comment_id = createdComment.id;
                    res.status(200).send(createdBlog.dataValues);
                })               
            })
            .catch(err => {
                console.log('comment create error : ', err);
            })
        })
        .catch((err) => {
            console.log('create error : ', err);
        });
    },
    readBlog: async (req, res) => {
        await models.blog.findOne({
            include: [
                {
                    model: models.user,
                    as: "createdBy_user",
                    required:false
                }
            ],
            where: {
                id: req.query.blogId
            }
        })
        .then((foundBlog) => {
            res.status(200).send(foundBlog);
        })
        .catch((err) => {
            console.log('read error : ', err);
        });
    },
    updateBlog: async (req, res) => {
        await models.blog.update({
            topic: req.body.topic,
            content: req.body.content
        }, {
            where: {
                id: req.body.blogId
            }
        })
        .then((result) => {
            res.send('Your blog is updated successfully!');
        })
        .catch((err) => {
            console.log('update error : ', err);
        });
    },
    deleteBlog: async (req, res) => {
        await models.blog.destroy({
            where: {
                id: req.query.blogID
            }
        })
        .then((result) => {
            res.send('Your blog is deleted successfully!');
        })
        .catch((err) => {
            console.log('delete error : ', err);
        });
    },
    getGoodBlogs: async (req, res) => {
        await models.blog.findAll({
            limit: 9,
            include: [
                {
                    model: models.user,
                    as: "createdBy_user",
                    required:false
                }
            ]
        })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log('delete error : ', err);
        });
    },
    getMyBlogs: async (req, res) => {
        await models.blog.findAll({
            where: {
                createdBy: req.id
            }
        })
        .then((foundBlogs) => {
            res.status(200).send(foundBlogs);
        })
        .catch((err) => {
            console.log('read error : ', err);
        });
    },
    getFollowBlogs: async (req, res) => {
        await models.blog.findAll({
            include: [
                {
                    model: models.user,
                    as: "createdBy_user",
                    required: true,
                    include: [
                        {
                            model: models.follow,
                            as: "follows",
                            required: true,
                            where: {
                                sender: req.id
                            }

                        }
                    ]
                }
            ]
        })
        .then((foundFollows) => {
            res.status(200).send(foundFollows);
        })
        .catch((err) => {
            console.log('comment read error : ', err);
        });
    },
    getOtherBlogs: async (req, res) => {
        await models.blog.findAll({
            where: {
                createdBy: req.query.userId
            },
            include: [
                {
                    model: models.user,
                    as: "createdBy_user",
                    required:false
                }
            ],
        })
        .then((foundBlogs) => {
            res.status(200).send(foundBlogs);
        })
        .catch((err) => {
            console.log('read error : ', err);
        });
    }
}

module.exports = blogCtrl;