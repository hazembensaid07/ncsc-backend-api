const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const restaurentSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 32,
  },
  adress: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
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
  frenquent: { type: Number, default: 0, required: false },
});

module.exports = Restaurent = model("restaurent", restaurentSchema);
