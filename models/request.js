const mongoose = require("mongoose");
const { Schema, model } = mongoose;
//request model
const requestSchema = new Schema({
  //user who sends the request id
  Sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //user who receives the request id
  Receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  //request status pending by default if accepted or declined it will be deleted from the db
  status: {
    type: String,

    default: "en attente",
  },
});

module.exports = Request = model("request", requestSchema);
