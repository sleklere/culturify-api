const sequelize = require('sequelize')

const db = require('../data/models')
const Users = db.User
const Posts = db.Post

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const allUsers = await Users.findAll()
      res.status(200).json(allUsers)
    } catch (err) {
      // console.log(err)
      res.status(500).send(err.message)
    }
  },
  getUser: async (req, res) => {
    console.log(`Getting user with id: ${req.params.id}`)
    try {
      const user = await Users.findByPk(req.params.id)
      res.status(200).json(user)
    } catch (err) {
      console.log(err)
      res.status(500).send(err.message)
    }
  },
  getAllPosts: async (req, res) => {
    try {
      let allPosts = await Posts.findAll({
        include: [
          { model: db.User, as: 'author' },
          {
            model: db.Like,
            as: 'likes',
            attributes: [
              [sequelize.fn('COUNT', sequelize.col('likes.id')), 'count'],
            ],
          },
        ],
        group: ['id', 'author.id'],
        raw: true,
        nest: true,
      })

      res.status(200).json(allPosts)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  },
  getAllComments: async (req, res) => {
    const comments = await db.Comment.findAll()
    res.status(200).json(comments)
  },
  getPostComments: async (req, res) => {
    try {
      const id = req.params.id
      const comments = await db.Comment.findAll({
        where: { postId: req.params.id },
      })
      res.status(200).json(comments)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  },
}
