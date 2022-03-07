var DataTypes = require("sequelize").DataTypes;
var _blog = require("./blog");
var _clap = require("./clap");
var _classify = require("./classify");
var _comment = require("./comment");
var _follow = require("./follow");
var _tag = require("./tag");
var _user = require("./user");

function initModels(sequelize) {
  var blog = _blog(sequelize, DataTypes);
  var clap = _clap(sequelize, DataTypes);
  var classify = _classify(sequelize, DataTypes);
  var comment = _comment(sequelize, DataTypes);
  var follow = _follow(sequelize, DataTypes);
  var tag = _tag(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  clap.belongsTo(blog, { as: "blog", foreignKey: "blog_id"});
  blog.hasMany(clap, { as: "claps", foreignKey: "blog_id"});
  classify.belongsTo(blog, { as: "blog", foreignKey: "blog_id"});
  blog.hasMany(classify, { as: "classifies", foreignKey: "blog_id"});
  comment.belongsTo(blog, { as: "blog", foreignKey: "blog_id"});
  blog.hasMany(comment, { as: "comments", foreignKey: "blog_id"});
  classify.belongsTo(tag, { as: "tag", foreignKey: "tag_id"});
  tag.hasMany(classify, { as: "classifies", foreignKey: "tag_id"});
  blog.belongsTo(user, { as: "createdBy_user", foreignKey: "createdBy"});
  user.hasMany(blog, { as: "blogs", foreignKey: "createdBy"});
  clap.belongsTo(user, { as: "createdBy_user", foreignKey: "createdBy"});
  user.hasMany(clap, { as: "claps", foreignKey: "createdBy"});
  comment.belongsTo(user, { as: "createdBy_user", foreignKey: "createdBy"});
  user.hasMany(comment, { as: "comments", foreignKey: "createdBy"});
  follow.belongsTo(user, { as: "receiver_user", foreignKey: "receiver"});
  user.hasMany(follow, { as: "follows", foreignKey: "receiver"});
  follow.belongsTo(user, { as: "sender_user", foreignKey: "sender"});
  user.hasMany(follow, { as: "sender_follows", foreignKey: "sender"});

  return {
    blog,
    clap,
    classify,
    comment,
    follow,
    tag,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
