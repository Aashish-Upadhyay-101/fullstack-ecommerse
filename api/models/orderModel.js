const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    required: [true, "A order must belong to a User"],
  },
});

const Order = mongoose.model("Order", orderSchema);
