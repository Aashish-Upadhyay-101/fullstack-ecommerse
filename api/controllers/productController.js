const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsync");

exports.getProducts = catchAsyncError(async (req, res) => {
  const product = await Product.find();

  if (!product) {
    return next(new AppError("No products found", 404));
  }

  res.status(200).json({
    status: "success",
    result: product.length,
    product: product,
  });
});

exports.getProductByCategory = catchAsyncError(async (req, res) => {
  const product = await Product.find({ category: req.params.category });

  if (!product) {
    return next(new AppError("No products found", 404));
  }

  res.status(200).json({
    status: "success",
    result: product.length,
    product,
  });
});

exports.getSingleProduct = catchAsyncError(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No products found", 404));
  }

  res.status(200).json({
    status: "success",
    product,
  });
});

exports.createProduct = catchAsyncError(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    product,
  });
});

exports.updateProduct = catchAsyncError(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No products found", 404));
  }

  res.status(200).json({
    status: "success",
    product,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No products found", 404));
  }

  res.status(200).json({
    status: "success",
  });
});
