const multer = require("multer");
const sharp = require("sharp");
const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsync");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("please upload an image file !", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImage = upload.single("image");

exports.resizeImage = (req, res, next) => {
  if (!req.file) return next();

  const fileExt = req.file.mimetype.split("/")[1];

  req.file.filename = `${req.user.name}-${
    req.user._id
  }-${Date.now()}.${fileExt}`;

  sharp(req.file.buffer)
    .resize(800, 1000)
    .toFormat("jpeg")
    .jpeg({ quality: 100 })
    .toFile(`uploads/products/${req.file.filename}`);

  req.body.image = req.file.filename;
  next();
};

exports.getProducts = catchAsyncError(async (req, res, next) => {
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

exports.getProductByCategory = catchAsyncError(async (req, res, next) => {
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

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No products found", 404));
  }

  res.status(200).json({
    status: "success",
    product,
  });
});

exports.createProduct = catchAsyncError(async (req, res, next) => {
  // req.body.image = req.file.filename; // adding image name
  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    product,
  });
});

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  // req.body.image = req.file.filename; // change image name
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  console.log(req.file); // multer

  if (!product) {
    return next(new AppError("No products found", 404));
  }

  res.status(200).json({
    status: "success",
    product,
  });
});

exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No products found", 404));
  }

  res.status(200).json({
    status: "success",
  });
});
