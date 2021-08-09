const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
});

module.exports = Order = model("order", orderSchema);
