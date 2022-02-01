const JWT = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsyncError = require("../utils/catchAsync");

// create jwt token
const createJWT = (id) => {
  return JWT.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// manage and handle jwt access token
const createAccessToken = (user, statusCode, res) => {
  const token = createJWT(user._id);

  // save cookie in the browser cookie
  res.cookie("jwt-token", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  // removing password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
  });
};

exports.signup = catchAsyncError(async (req, res, next) => {
  const userInfo = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  };

  const user = await User.create(userInfo);

  if (!user) {
    return next(
      new AppError("There was problem signing up, please try again", 401)
    );
  }

  createAccessToken(user, 201, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter both email and password", 400));
  }

  const user = await User.findOne({ email })
    .select("+password")
    .select("+active");

  if (!user) {
    return next(
      new AppError("No user found with that email, please signup !", 401)
    );
  }

  if (!(await user.correctPassword(password, user.password))) {
    return next(new AppError("Please enter the correct password", 401));
  }

  createAccessToken(user, 200, res);
});

exports.protected = catchAsyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token_index = req.headers.authorization.split(" ").length - 1;
    token = req.headers.authorization.split(" ")[token_index];
  }

  if (!token) {
    return next(new AppError("Please login to get access", 401));
  }

  const decodedToken = await promisify(JWT.verify)(
    token,
    process.env.SECRET_KEY
  );

  const currentUser = await User.findOne({ _id: decodedToken.id });
  if (!currentUser) {
    return next(new AppError("The user no longer exists!", 401));
  }

  if (currentUser.isPasswordChangedAfterLogin(decodedToken.iat)) {
    return next(
      new AppError("Password recently changed, please login in again!", 401)
    );
  }

  // assigning the user in request object that can be accessed throughout our app through : req.user
  req.user = currentUser;

  next();
});

exports.restrictUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You don't have permission to perform this action", 401)
      );
    }
    next();
  };
};

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!user) {
    return next(new AppError("Please login to change password"));
  }

  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return next(
      new AppError(
        "Current password doesn't match, please enter the current password"
      )
    );
  }

  user.password = req.body.newPassword;
  user.confirmPassword = req.body.confirmPassword;

  await user.save();

  createAccessToken(user, 200, res);
});

/* 
  signup 
  login
  update password
*/
