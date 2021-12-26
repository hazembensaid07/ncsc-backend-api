const express = require("express");
const router = express.Router();
const {addbooking,loadBookings,loadBooking,Transportplaces,getRooms}=require("../controllers/booking")
const { admin, isAuth } = require("../middlewares/SignIn");
const {
   bookingValidator 
  } = require("../validators/booking");
  const { runValidation } = require("../validators");
  
   router.post("/booking/add",  isAuth ,  bookingValidator , runValidation, addbooking);
   router.get("/booking/all", admin,loadBookings)
   router.get("/booking/one/:id",isAuth,loadBooking)
   router.get("/booking/transport",admin,Transportplaces)
   router.get("/booking/rooms",admin,getRooms)
  
  
module.exports = router;