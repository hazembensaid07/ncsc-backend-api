const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const hotelSchema = new Schema({
 
  
  rooms: {
    type: Number,
   
    default: 500
  },
  transport: {
    type: Number,
   
    default: 150
  },
  triple_rooms: {
    type: Number,
   
    default: 20
  },
 
});

module.exports =Hotel = model("hotel", hotelSchema);
