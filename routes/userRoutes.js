const express = require('express');
const { createUser } = require('../controllers/userController');
const { getPostsFromUser } = require('../controllers/postController');

const router = express.Router();

router.route('/').post(createUser);

router.get('/:userId/posts', getPostsFromUser);

// signup

module.exports = router;
