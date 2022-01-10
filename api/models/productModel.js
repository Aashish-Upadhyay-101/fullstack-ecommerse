const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.pre(/^find/, function (next) {
  this.quantity = undefined;

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
