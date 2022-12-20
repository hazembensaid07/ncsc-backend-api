const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//hotel schema
const hotelSchema = new Schema({
  //available rooms
  rooms: {
    type: Number,

    default: 500,
  },
  //available transport places
  transport: {
    type: Number,

    default: 150,
  },
  //available triple rooms
  triple_rooms: {
    type: Number,

    default: 20,
  },
});

module.exports = Hotel = model("hotel", hotelSchema);
