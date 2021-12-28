const express = require("express");
const router = express.Router();
const {addbooking,loadBookings,loadBooking,Transportplaces,getRooms,getAvailableRooms_Transport,addAvailableRooms_Transport,loadBookingByUserEmail,deleteBooking}=require("../controllers/booking")

const {hotelValidator}=require("../validators/hotel")
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
   router.get("/booking/available",isAuth,getAvailableRooms_Transport)
    router.post("/booking/add_available",admin,hotelValidator,addAvailableRooms_Transport)
    router.post("/booking/delete",isAuth,deleteBooking)
    router.get("/booking/byuseremail",isAuth,loadBookingByUserEmail)
  
module.exports = router;