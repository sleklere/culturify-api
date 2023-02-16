const db = require('../data/models')
const Users = db.User

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
}
