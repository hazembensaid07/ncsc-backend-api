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
 
});

module.exports =Hotel = model(" hotel", hotelSchema);