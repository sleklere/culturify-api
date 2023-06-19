const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: false,
    maxlength: [50, "A comment can't have more than 50 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: [true, 'A comment must belong to a post.'],
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
