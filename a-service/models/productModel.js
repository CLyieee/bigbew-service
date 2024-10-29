// models/Product.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ["Medium", "Large"], // assuming these sizes are fixed
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
});

module.exports = mongoose.model("Product", productSchema);
