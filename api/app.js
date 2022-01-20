const express = require("express");
// const cors = require("cors");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

// function for rate-limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many request, Please try again after an hour",
});

const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

const app = express();

// app.use(cors());

app.use(morgan("dev"));
app.use(helmet());
app.use(express.json({ limit: "10mb" }));

app.use(mongoSanitize());
app.use(xss());

// rate limiter middleware
app.use("/api/v1/user/login", limiter);

app.use("/api/v1/product", productRoute);
app.use("/api/v1/user", userRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
