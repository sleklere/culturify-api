module.exports = (sequelize, dataTypes) => {
  const columns = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: dataTypes.INTEGER,
      field: 'author_id',
      allowNull: false,
    },
    postId: {
      type: dataTypes.INTEGER,
      field: 'post_id',
      allowNull: false,
    },
    createdAt: {
      field: 'created_at',
      type: 'TIMESTAMP',
      alllowNull: false,
    },
  }
  const config = {
    tableName: 'comments',
    timestamps: true,
    updatedAt: false,
  }

  const Comment = sequelize.define('Comment', columns, config)

  return Comment
}
