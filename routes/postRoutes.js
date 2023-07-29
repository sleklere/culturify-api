const express = require('express');
const {
  createPost,
  getAllPosts,
  getPost,
  commentPost,
  likePost,
  deletePost,
  deleteLike,
} = require('../controllers/postController');
const { protect } = require('../controllers/authController');

const router = express.Router();

// GET posts from user (for the profile page)

// GET all posts (for the feed) (paginate to not load ALL of them at once?)
// POST - create a post
router.route('/').get(getAllPosts).post(createPost);

router.use(protect);

// GET one post
// POST  - comment a post
router.route('/:id').get(getPost).delete(deletePost);
router.post('/:id/comment', commentPost);
// POST  - like a post
router.post('/:id/like', likePost);
router.delete('/removelike/:id', deleteLike);
// DELETE a post

module.exports = router;
