const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.get('/users', controller.getAllUsers)
router.get('/users/:id', controller.getUser)
router.get('/posts', controller.getAllPosts)

// Gets all posts from a specific user (i.e in their profile page)
// router.get('/users/:id/posts', controller.getUserPosts) // should it be a end-point of its own or be part of the response of the /users/:id end-point?
router.get('/posts/:id/comments', controller.getPostComments)

// router.post('/register', controller.register)
// router.post('/login', controller.login)
// router.post('/logout', controller.logout)
// router.post('/users/:id/edit', controller.editProfile)
// router.post('/new-post', controller.newPost)
// router.post('/like-post', controller.likePost)
// router.post('/comment-post', controller.commentPost)

// TESTING
router.get('/comments', controller.getAllComments)

module.exports = router
