module.exports = (sequelize, dataTypes) => {
  const columns = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    authorId: {
      field: 'author_id',
      type: dataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    content: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  }

  const config = {
    tableName: 'posts',
    timestamps: false,
  }

  const Post = sequelize.define('Post', columns, config)

  Post.associate = models => {
    Post.belongsTo(models.User, {
      foreignKey: 'author_id',
      as: 'author',
    })
    Post.hasMany(models.Like, { foreignKey: 'post_id', as: 'likes' })
  }

  return Post
}
