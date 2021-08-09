//our document structure it conatines the attributes of the document with type and mention if it is required or not
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

module.exports = User = model("user", UserSchema);
