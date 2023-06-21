const Comment = require('../models/Comment');
const Post = require('../models/Post');
const catchAsync = require('../utils/catchAsync');

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find();

  res.status(200).json({
    status: 'success',
    results: posts.length,
    data: {
      posts,
    },
  });
});
exports.getFeedPosts = async (req, res, next) => {};
exports.getPost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate('comments');
  // .populate('likes');

  // if (!post) return next(new AppError('No post found with that ID', 404))

  res.status(200).json({
    status: 'success',
    data: {
      post,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const newPost = await Post.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      post: newPost,
    },
  });
});

exports.commentPost = catchAsync(async (req, res, next) => {
  const comment = await Comment.create(req.body);

  const postRelated = await Post.findById(req.body.post);
  postRelated.comments.push(comment);
  postRelated.numComments += 1;
  await postRelated.save();

  res.status(201).json({
    status: 'success',
    data: {
      comment,
    },
  });
});

exports.likePost = async (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined!',
  });
};
