const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Can't make an empty post"],
      maxlength: [100, "A post can't have more than 100 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  // the following is to make it so that virtual fields (the ones that are not stored in a DB and are - for example - calculated) appear whenever there is an output
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
// As i don't want the comments to always appear in the output, i set it up as a virtual property, so that i can choose when to populate it.
postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

// Query middleware
postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    // select: ''
  });

  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
