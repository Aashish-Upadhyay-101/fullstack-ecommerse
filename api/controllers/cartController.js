const Cart = require("../models/cartModel");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsync");

exports.addCartItem = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const productId = req.params.id;
  const quantity = req.body.quantity;

  const cart = await Cart.create({
    user: userId,
    product: productId,
    quantity: quantity,
  });

  if (!cart) {
    return next(new AppError("Can't create cart, please try again!", 401));
  }

  res.status(201).json({
    status: "success",
    cart,
  });
});

exports.getAllCart = catchAsyncError(async (req, res, next) => {
  const cart = await Cart.find();

  if (!cart) {
    return next(new AppError("Can't find cart", 404));
  }

  res.status(200).json({
    status: "success",
    result: cart.length,
    cart,
  });
});

exports.getUserCart = catchAsyncError(async (req, res, next) => {
  const cart = await Cart.find({ user: req.user._id }).populate("product");

  if (!cart) {
    return next(new AppError("Can't find cart", 404));
  }

  res.status(200).json({
    status: "success",
    result: cart.length,
    cart,
  });
});
