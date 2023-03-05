module.exports = (sequelize, dataTypes) => {
  const columns = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      field: 'first_name',
      type: dataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      field: 'last_name',
      type: dataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: dataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    igUser: {
      field: 'ig_user',
      type: dataTypes.STRING,
      allowNull: true,
    },
    twUser: {
      field: 'tw_user',
      type: dataTypes.STRING,
      allowNull: true,
    },
  }

  const config = {
    tableName: 'users',
    timestamps: false,
  }

  const User = sequelize.define('User', columns, config)

  User.associate = models => {
    User.hasMany(models.Post, {
      foreignKey: 'author_id',
      as: 'posts',
    })
  }

  return User
}
