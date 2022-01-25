const User = require("../models/userModel");
const catchAsyncError = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    users,
  });
});

// exports.getCurrentUserById = catchAsyncError(async (req, res, next) => {
//   const user = await User.find({ _id: req.body._id });

//   res.status(200).json({
//     status: "success",
//     user,
//   });
// });

exports.getMe = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(AppError("No user found", 401));
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.createUser = catchAsyncError(async (req, res, next) => {
  const user = await User.create(req.body);

  if (!user) {
    return next(
      new AppError(
        "There was problem creating new user, please try again!",
        401
      )
    );
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

// updated code
exports.deactivateAccount = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { active: false },
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Your account has be deactivated!",
  });
});

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    message: "Account successfully deleted !",
  });
});

// get all user
// get one user
// delete user
// create user
// delete user
// no update user
