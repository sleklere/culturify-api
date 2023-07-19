const express = require('express');
const { getPostsFromUser } = require('../controllers/postController');
const {
  signup,
  login,
  logout,
  protect,
} = require('../controllers/authController');
const { getUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

// PROTECTED ROUTES
router.use(protect);

router.route('/:id').get(getUser);
router.get('/:userId/posts', getPostsFromUser);
router.get('/', getAllUsers);
//   .patch(protect, updateUser)
//   .delete(protect, deleteUser);

module.exports = router;
