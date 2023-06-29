const express = require('express');
const {
  createPost,
  getAllPosts,
  getPost,
  commentPost,
  likePost,
} = require('../controllers/postController');
const { protect } = require('../controllers/authController');

const router = express.Router();

// GET posts from user (for the profile page)

// GET all posts (for the feed) (paginate to not load ALL of them at once?)
// POST - create a post
router.route('/').get(getAllPosts).post(createPost);
// GET one post
// POST  - comment a post
router.route('/:id').get(protect, getPost);
router.post('/:id/comment', protect, commentPost);
// POST  - like a post
router.post('/:id/like', protect, likePost);

// DELETE a post

module.exports = router;
