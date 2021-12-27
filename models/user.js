//our document structure it conatines the attributes of the document with type and mention if it is required or not
const mongoose = require("mongoose");
const crypto = require("crypto");
// user schema
const userScheama = new mongoose.Schema(
  {
      firstName: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    
     lastName: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    CIN:{
      type:String,
      required:true,
      max: 8,
    },
    socialLink: {
      type:String,
      required:true,
    },
    birthDate : {
      type : String,
      required :true,
    },
    address: {
      type:String,
      required:true,
    },
    
    studyField:{
      type:String,
      required:true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    
   
    phone: {
      type: String,
      default: ""
    },
    university: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: String,
      default: "customer",
    },
    resetPasswordLink: {
      data: String,
      default: "",
    },
  },
  { timestamps: true }
);

// virtual
userScheama
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

// methods
userScheama.methods = {
  //verify that the email and the password matches or not
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password; // true false
  },

  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userScheama);
