const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  // full date with hours and minutes
  date: {
    type: Date,
    required: true,
  },
  persons: {
    type: Number,
    required: true,
  },
});

module.exports = Booking = model(" booking", bookingSchema);
