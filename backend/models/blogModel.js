const mongoose = require('mongoose');
const slugify = require('slugify');
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      ref: 'BCategory',
    },
    thumbnail: {
      type: String,
    },
    author: {
      type: String,
      default: 'Admin',
    },
    isLiked: { type: Boolean, default: false },
    isDisLiked: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    disLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);
blogSchema.pre('save', async function (next) {
  const blogObject = this;
  blogObject.slug = await slugify(blogObject.title, {
    replacement: '-',
    lower: true,
    trim: true,
    remove: /[*+~.()'"!:@]/g,
  });
  next();
});
module.exports = mongoose.model('Blog', blogSchema);
