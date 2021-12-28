const Booking= require("../models/booking");
const User=require("../models/user")
const Hotel=require("../models/hotel")
const Request=require("../models/request")
exports.addbooking = async (req, res) => {
    try { //transport  yes or no
      const {room,transport}=req.body
      id_maker=req.user._id
    let phones=[]
      let  emails=[]
      const result = await User.findById(id_maker).populate('roomMates').select("email,phone")
     
      
      result.roomMates.map(async(el)=> {phones.push(el.phone);

      emails.push(el.email);
      const resu = await User.updateOne(
        { _id: el._id},
        { $set: { booking : true } }
      );})
      const resu = await User.updateOne(
        { _id: id_maker},
        { $set: { booking : true } }
      )
      let booking={}
       if(transport==="yes")
      {booking={ id_maker,room,transport_number:emails.length,transport,emails,phones,transport}}
      else { booking={ id_maker,room,transport,emails,phones,transport}}
     
      const book = new Booking(booking);
      const response = await book.save();
      const r= await Hotel.find();

      const psu = await Hotel.updateOne(
        { _id: r[0]._id},
        { $set: {rooms: r[0].rooms-=emails.length ,
                 transport: r[0].transport-=emails.length} }
      )
      
    
      res.status(200).send({  message: "booking  added with success" });
    }
       
    catch (error) {

       res.status(400).send("can not save it");
    }
  };
  exports.loadBooking= async (req, res) => {
   
    try {
        //get the id from params
        const id = req.params.id;
        //lauch findById query
        const result = await Booking.findById(id);
    
        if (!result) {
          res.status(400).send({ msg: "there is no booking  " });
          return;
        } else {
          res.status(200).send({ message: "booking   found ", result });
        }
      } catch (error) {
        res.status(400).send({ message: "try later cannot respond" });
      }
  };
  exports.loadBookingByUserEmail= async (req, res) => {
   
    try {
        //get the id from params
        const email = req.user.email
        //lauch findById query
        const result = await Booking.findOne({emails: email});
    
        if (!result) {
          res.status(400).send({ msg: "there is no booking  " });
          return;
        } else {
          res.status(200).send({ message: "booking   found ", result });
        }
      } catch (error) {
        res.status(400).send({ message: "try later cannot respond" });
      }
  };
  
  exports.loadBookings= async (req, res) => {
    try {
      const result = await Booking.find();
     
      
      res.status(200).send({ response: result, message: "bookings  found" });
    } catch (error) {
      res.status(400).send({ message: "can not get bookings" });
    }
  };
  exports.Transportplaces= async (req, res) => {
    try {
       let  places=0;
      const result = await Booking.find();
      result.map((el => places +=el.transport_number))
      res.status(200).send({ place: places, message: "bus places" });
    } catch (error) {
      res.status(400).send({ message: "can not get places" });
    }
  };
 

   exports.getRooms= async (req, res) => {
    try {
       let single=0;
       let double=0;
       let triple=0;
      const result = await Booking.find();
      //const re=await Booking.deleteMany();
      result.map((el =>  ( el.room===1 && single ++,
        el.room===2 && double ++,
        el.room===3 && triple ++)))
      res.status(200).send({single_room : single, double_room: double,triple_room : triple ,message: "rooms per category" });
    } catch (error) {
      res.status(400).send({ message: "can not get rooms" });
    }
  };
 
  
  exports.getAvailableRooms_Transport = async (req, res)=> {
    try {
      const result = await Hotel.find();
      res.status(200).send({rooms : result[0].rooms,transport: result[0].transport});
    } catch (error) {
      res.status(400).send({ message: "error try later" });
    }
  }
  exports.addAvailableRooms_Transport = async (req, res)=> {
    try {
      const hotel = new Hotel(req.body);
      const response = await hotel.save();
      res.status(200).send({ message: "hotel  added with success" });
    } catch (error) {
      res.status(400).send("can not save it");
    }
  }
  exports.deleteBooking= async (req, res) => {
    try {
      const id_maker=req.user.id
      const emailSender=req.user.email
      const result = await Booking.deleteOne({ id_maker: id_maker });
      const resul= await Request.deleteOne({ emailSender: emailSender });
      
            
           
     
     req.user.roomMates.map(async(el) => {
      const user= await User.findById(el)
      const resu = await User.updateOne(
        { _id: el},
        { $set: { booking : false } }
      );
     })
      const resu = await User.updateOne(
          { _id: req.user._id },
          { $set: { booking : false,
                    roomMates: []} }
        );
     
      
      res.status(200).send({message: "booking deleted" });
    } catch (error) {
      res.status(400).send({ message: "can not get bookings" });
    }
  };