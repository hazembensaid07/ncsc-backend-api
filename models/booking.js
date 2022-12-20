const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//booking schema
const bookingSchema = new Schema(
  {
    //id of the user who made the request
    id_maker: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      required: true,
    },
    //the type of the room
    room: {
      type: Number,
      required: true,
    },
    //emails of roomates
    emails: {
      type: Array,
      default: [],
      required: true,
    },
    //phones of roomates
    phones: {
      type: Array,
      default: [],
      required: true,
    },
    paid: { type: Boolean, default: false },
  },

  { timestamps: true }
);

module.exports = Booking = model("booking", bookingSchema);
