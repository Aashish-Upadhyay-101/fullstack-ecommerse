const express = require("express");
const { Error } = require("mongoose");
const productRoute = require("./routes/productRoute");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

const app = express();

app.use(express.json());

app.use("/api/v1/product", productRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find the ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
