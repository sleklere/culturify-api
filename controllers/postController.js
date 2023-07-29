const Comment = require('../models/Comment');
const Like = require('../models/Like');
const Post = require('../models/Post');
const catchAsync = require('../utils/catchAsync');
const { getOne, getAll, createOne, deleteOne } = require('./handlers');

exports.getAllPosts = getAll(Post);

exports.getPostsFromUser = getAll(Post, 'user');

exports.getFeedPosts = async (req, res, next) => {};

exports.getPost = getOne(Post, { path: 'comments' });

exports.createPost = createOne(Post);

exports.deletePost = deleteOne(Post);

exports.deleteComment = deleteOne(Comment);

exports.deleteLike = deleteOne(Like);

exports.commentPost = catchAsync(async (req, res, next) => {
  const comment = await Comment.create(req.body);

  const postRelated = await Post.findById(req.body.post);
  postRelated.numComments += 1;
  await postRelated.save();

  res.status(201).json({
    status: 'success',
    data: {
      comment,
    },
  });
});

exports.likePost = catchAsync(async (req, res) => {
  const like = await Like.create(req.body);

  const postRelated = await Post.findById(req.body.post);

  postRelated.numLikes += 1;

  await postRelated.save();

  res.status(201).json({
    status: 'success',
    data: {
      like,
    },
  });
});
