const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: false,
      maxlength: [100, "A post can't have more than 100 characters"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A post must be made by a user'],
    },
    // comments: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Comment',
    //   },
    // ],
    // likes: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Like',
    //   },
    // ],
    numComments: {
      type: Number,
      required: true,
      default: 0,
    },
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  // the following is to make it so that virtual fields (the ones that are not stored in a DB and are - for example - calculated) appear whenever there is an output
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
postSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'post',
  localField: '_id',
});

// Query middleware
postSchema.pre(/^find/, function (next) {
  this.start = Date.now();
  next();
});

postSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    // select: ''
  });

  next();
});

postSchema.post(/^find/, function (docs, next) {
  // console.log(this);
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  // console.log(docs);
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
