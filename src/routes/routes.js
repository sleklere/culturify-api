const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.get('/users', controller.getAllUsers)

module.exports = router
