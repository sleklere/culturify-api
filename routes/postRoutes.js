const express = require('express');
const {
  createPost,
  getAllPosts,
  getPost,
  commentPost,
} = require('../controllers/postController');

const router = express.Router();

// GET all posts (for the feed) (paginate or something to not load ALL of them at once)
// GET posts from user (for the profile page)

// POST - create a post
router.route('/').get(getAllPosts).post(createPost);

// GET one post
// POST  - comment a post
router.route('/:id').get(getPost).post(commentPost);

// POST  - like a post
// DELETE a post

module.exports = router;
