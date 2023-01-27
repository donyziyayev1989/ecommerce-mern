const mongoose = require('mongoose');

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);
const PCategory = mongoose.model('PCategory', categorySchema);
const BCategory = mongoose.model('BCategory', categorySchema);
module.exports = { PCategory, BCategory };
