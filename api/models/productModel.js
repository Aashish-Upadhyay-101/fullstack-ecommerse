const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "A product must have a name"],
  },

  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },

  category: {
    type: String,
    required: [true, "A product must have a category defined"],
  },

  quantity: {
    type: Number,
    default: 1,
  },

  image: {
    type: String,
    required: [true, "A product must have a image"],
  },

  description: {
    type: String,
    required: [true, "A product must have a description"],
  },

  ratingsAverage: {
    type: Number,
    min: [1, "Rating must be above 1"],
    max: [5, "Rating must be below 5"],
    default: 4.1,
  },

  ratingQuantity: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
