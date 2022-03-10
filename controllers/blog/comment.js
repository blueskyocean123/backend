const models = require('../../models');
const { Op } = require('sequelize');

const commentCtrl = {
    createComment : async (req, res) => {
        var originLft = 0;
        var originDep = 0;
        if (req.body.commentId == 0) {
            originLft = 1;
            originDep = 0;
        } else {
            await models.comment.findOne({ 
                where: { 
                    id: req.body.commentId
                }
            })
            .then((foundComment) => {
                originLft = foundComment.lft;
                originDep = foundComment.depth;
            })
            .catch((err) => {
                console.log('It is failed to create comment : ', err);
            });
        }
        await models.comment.findAll({
            where: {
                blog_id: req.body.blogId,
                rgt: {
                    [Op.gt]: originLft
                }
            }
        })
        .then((foundComments) => {
            foundComments.forEach(eachComment => {
                models.comment.update({
                    rgt: eachComment.rgt + 2
                }, {
                    where: {
                        id: eachComment.id
                    }
                })
                .then((updatedComment) => { }
                )
                .catch((err) => {
                    console.log('update error : ', err);
                });
            });
        })
        .catch((err) => {
            console.log('It is failed.');
        })

        await models.comment.findAll({
            where: {
                blog_id: req.body.blogId,
                lft: {
                    [Op.gt]: originLft
                }
            }
        })
        .then((foundComments) => {
            foundComments.forEach(eachComment => {
                models.comment.update({
                    lft: eachComment.lft + 2
                }, {
                    where: {
                        id: eachComment.id
                    }
                })
                .then((updatedComment) => { }
                )
                .catch((err) => {
                    console.log('update error : ', err);
                });
            });
        })
        .catch((err) => {
            console.log('It is failed.');
        })
        
        await models.comment.create({
            content: req.body.content,
            lft: originLft + 1,
            rgt: originLft + 2,
            createdBy: req.id,
            blog_id: req.body.blogId,
            depth: originDep + 1
        })
        .then((createdComment) => {
            res.status(200).send({
                msg: "success"
            });
        })
        .catch((err) => {
            console.log('create error : ', err);
        });
    },
    updateComment: async (req, res) => {
        var originLft = 0;
        var originRgt = 0;
        var blogId = 0;
        await models.comment.findOne({
            where: {
                id: req.body.commentId
            }
        })
        .then((foundComment) => {
            originLft = foundComment.lft;
            originRgt = foundComment.rgt;
            blogId = foundComment.blog_id;
        })
        .catch((err) => {
            console.log('select err : ', err);
        });
        await models.comment.findAll({
            attributes: ['content'],
            where: {
                lft: {
                    [Op.gt]: originLft
                },
                lft: {
                    [Op.lt]: originRgt
                },
                blog_id: blogId
            },
            group: ['content'],
            order: ['lft']
        })
        .then((foundComments) => {
            if (foundComments) {
                res.send('Sorry! Your update request is blocked because of recomment.');
            } else {
                models.comment.update({
                    content: req.body.content
                }, {
                    where: {
                        id: req.body.commentId
                    }
                })
                .then((updatedComment) => {
                    res.status(200).send({
                        msg: 'Your comment is updated successfully!'
                    });
                })
                .catch((err) => {
                    console.log('update error : ', err);
                });
            }
        })
    },
    deleteComment: async (req, res) => {
        var originLft = 0;
        var originRgt = 0;
        var blogId = 0;
        await models.comment.findOne({
            where: {
                id: req.body.commentId
            }
        })
        .then((result) => {
            originLft = result.lft;
            originRgt = result.rgt;
            blogId = result.blog_id;
        })
        .catch((err) => {
            console.log('select err : ', err);
        });
        await models.comment.findAll({
            attributes: ['content'],
            where: {
                lft: {
                    [Op.gt]: originLft
                },
                lft: {
                    [Op.lt]: originRgt
                },
                blog_id: blogId
            },
            group: ['content'],
            order: ['lft']
        })
        .then((result) => {
            if (result) {
                res.send('Sorry! Your delete request is blocked because of recomment.');
            } else {
                models.comment.destroy({
                    where: {
                        id: req.body.commentId
                    }
                })
                .then((result) => {
                    res.send('Your comment is deleted successfully!');
                })
                .catch((err) => {
                    console.log('delete error : ', err);
                });
            }
        })
    },
    readComment: async (req, res) => {
        await models.comment.findAll({
            include: [
                {
                    model: models.user,
                    as: "createdBy_user",
                    required:false
                }
            ],
            where: {
                blog_id: req.query.blogId,
                lft: {
                    [Op.gt]: 1
                }
            },
            order: ['lft']
        })
        .then((foundComments) => {
            res.status(200).send(foundComments);
        })
        .catch((err) => {
            console.log('comment read error : ', err);
        });
    }
}

module.exports = commentCtrl;