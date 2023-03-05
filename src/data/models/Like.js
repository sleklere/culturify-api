module.exports = (sequelize, dataTypes) => {
  const columns = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      authoIncrement: true,
    },
    authorId: {
      field: 'author_id',
      type: dataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
    postId: {
      field: 'post_id',
      type: dataTypes.INTEGER,
      foreignKey: true,
      allowNull: false,
    },
  }

  const config = { tablename: 'likes', timestamps: false }

  const Like = sequelize.define('Like', columns, config)

  return Like
}
