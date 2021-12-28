const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const requestSchema = new Schema({
 
  
  emailSender: {
      type: String,
      trim: true,
      required: true,
      
      lowercase: true,
  },
  emailReceiver: {
    type: String,
    trim: true,
    required: true,
    
    lowercase: true,
  },
  lastNameReceiver: {
    type: String,
   
    required: true,
    
   
  },
 firstNameReceiver: {
    type: String,
    
    required: true,
    
   
  },
  lastNameSender: {
    type: String,
   
    required: true,
    
   
  },
 firstNameSender: {
    type: String,
    
    required: true,
    
   
  },

  status:{
    type:String,
   
    default: "en attente"
  }
 
});

module.exports =Request = model("request", requestSchema);