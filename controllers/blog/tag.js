const models = require('../../models');

const topicCtrl = {
    createTag: async (req, res) => {
        var result = false;
        for (var i = 0; i < req.body.tags.length; i++) {
            await models.tag.findOne({
                where: {
                    name: req.body.tags[i]
                }
            })
            .then(async (foundTag) => {
                if (foundTag == null) {
                    await models.tag.create({
                        name: req.body.tags[i],
                        num: 1
                    })
                    .then(async (createdTag) => {
                        await models.classify.create({
                            blog_id: req.body.blogId,
                            tag_id: createdTag.id
                        })
                        .then((createdClassify) => {
                            console.log(createdClassify);
                            result = true;
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                } else {
                    var originNum = foundTag.dataValues.num;
                    var originId = foundTag.dataValues.id;
                    await models.tag.update({
                        num: originNum + 1
                    }, {
                        where: {
                            id: foundTag.dataValues.id
                        }
                    })
                    .then(async (updatedTag) => {
                        await models.classify.create({
                            blog_id: req.body.blogId,
                            tag_id: originId
                        })
                        .then((createdClassify) => {
                            console.log(createdClassify);
                            result = true;
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                }
            })
            .catch((err) => {
                console.log('check error : ', err);
            });
        }
        if (result == true) {
            res.status(200).send({
                msg: 'success'
            });
        }
    },
    deleteClassify: async (req, res) => {
        await models.classify.destroy({
            where: {
                blog_id: req.body.blogId
            },
            truncate: true
        })
        .then(result => {
            res.status(200).send({
                msg: 'success'
            });
        })
        .catch(err => {
            console.log(err);
        })
    },
    // sorting 8 tags according to the column "num"
    sortTag: async (req, res) => {
        await models.tag.findAll({
            attributes: ['name'],
            limit: 8,
            order: ['num']
        })
        .then(foundTags => {
            res.status(200).send(foundTags);
        })
        .catch(err => {
            console.log(err);
        })
    },

    getTag: async (req, res) => {
        await models.classify.findAll({
            include: [
                {
                    model: models.tag,
                    required: false,
                    as: "tag"
                }
            ],
            where: {
                blog_id: req.query.blogId
            }
        })
        .then(foundTags => {
            res.status(200).send(foundTags);
        })
        .catch(err => {
            console.log(err);
        })
    }
}

module.exports = topicCtrl;