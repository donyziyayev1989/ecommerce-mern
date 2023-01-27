const mongoose = require('mongoose');
const slugify = require('slugify');
const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
      ref: 'PCategory',
    },
    brand: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      required: true,
    },
    isLiked: { type: Boolean, default: false },
    isDisLiked: { type: Boolean, default: false },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    disLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    ratings: [
      {
        star: Number,
        postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  { timestamps: true }
);
// Generate slug
productSchema.pre('save', async function (next) {
  const productObject = this;
  productObject.slug = await slugify(productObject.title, {
    replacement: '-',
    lower: true,
    trim: true,
    remove: /[*+~.()'"!:@]/g,
  });
  next();
});
productSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
