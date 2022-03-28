const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const requestSchema = new Schema({
 
  
 Sender: {
  type : mongoose.Schema.Types.ObjectId,
  ref : 'User',
  
  },
  Receiver: {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User',
    
  },
  

  status:{
    type:String,
   
    default: "en attente"
  }
 
});

module.exports =Request = model("request", requestSchema);