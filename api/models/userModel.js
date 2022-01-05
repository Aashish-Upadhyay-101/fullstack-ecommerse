const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "A user must have a name"],
    minlength: [3, "Name must be more than 3 letters"],
    maxlength: [30, "Name must be less than 30 letters"],
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "A user must have an email address"],
    validate: [validator.isEmail, "Please enter valid email address"],
  },

  photo: String,

  role: {
    type: String,
    enum: ["buyer", "seller", "super-user"],
    default: "buyer",
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },

  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "Confirm passworld didn't match",
    },
  },

  passwordChangedAt: Date,

  // updated code
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// updated code
userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  enteredPassword,
  hashedPassword
) {
  return await bcrypt.compare(enteredPassword, hashedPassword);
};

userSchema.methods.isPasswordChangedAfterLogin = function (recentChangedTime) {
  if (this.passwordChangedAt) {
    const changedAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return recentChangedTime < changedAt;
  }
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
