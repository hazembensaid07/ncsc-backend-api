const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  id_maker: {
    type:   mongoose.Schema.Types.ObjectId,
    trim: true,
    required: true,
   
  },
  
  room: {
    type: Number,
    required: true,
  },
 emails: {
    type: Array,
    default: [],
    required: true,
  },
  transport_emails: {
    type: Array,
    default: [],
    required: true,
  },
  transport_phones: {
    type: Array,
    default: [],
    required: true,
  },
  transport_number: {
    type: Number,
    required: true,
  },
});

module.exports =Booking = model("booking", bookingSchema);