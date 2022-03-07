const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('classify', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    blog_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'blog',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'classify',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "fk_classify_post_id_idx",
        using: "BTREE",
        fields: [
          { name: "blog_id" },
        ]
      },
      {
        name: "fk_classify_category_id_idx",
        using: "BTREE",
        fields: [
          { name: "tag_id" },
        ]
      },
    ]
  });
};
