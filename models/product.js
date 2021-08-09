const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: Array,
    default: [],
    required: true,
  },
  description: {
    type: String,
    max: 64,
  },
  sales: { type: Number, default: 0, required: false },
  discount: { type: Number, default: 0, required: false },
});

module.exports = Product = model("product", productSchema);
