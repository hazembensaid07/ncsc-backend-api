const Booking= require("../models/booking");
const User=require("../models/user")
const Hotel=require("../models/hotel")

exports.addbooking = async (req, res) => {
    try { //transport  yes or no
      const {room}=req.body
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
      emails.push(req.user.email);
      phones.push(req.user.phone)
      const resu = await User.updateOne(
        { _id: id_maker},
        { $set: { booking : true } }
      )
      let booking={}
    
      booking={ id_maker,room,emails,phones}
    
     
      const book = new Booking(booking);
      const response = await book.save();
      const r= await Hotel.find();
    if(emails.length==3)
     { const psu = await Hotel.updateOne(
        { _id: r[0]._id},
        { $set: {rooms: r[0].rooms-=emails.length ,
                
                 triple_rooms: r[0].triple_rooms-=1} }
      )
      
    
      res.status(200).send({  message: "booking  added with success" }); }
      else {const psu = await Hotel.updateOne(
        { _id: r[0]._id},
        { $set: {rooms: r[0].rooms-=emails.length ,
                } }
      )
      
    
      res.status(200).send({  message: "booking  added with success" });}
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
  exports.loadBookingByEmail= async (req, res) => {
   
    try {
        //get the id from params
        const email = req.body.email
        //lauch findById query
        const result = await Booking.find({emails: email});
      const r=await User.findOne({email: email})
        if (!result) {
          res.status(400).send({ msg: "there is no booking  " });
          return;
        } else {
          res.status(200).send({ message: "booking   found ", result,r });
        }
      } catch (error) {
        res.status(400).send({ message: "try later cannot respond" });
      }
  };
  
  exports.loadBookings= async (req, res) => {
    try {
      const result = await Booking.find().select("emails -_id");
      const r=await User.find({booking : true}).count()
      
     
      
      res.status(200).send({ response: result, message: "bookings  found",r });
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
    try {  let single=0;
      let double=0;
      let triple=0;
     const result = await Booking.find();
     //const re=await Booking.deleteMany();
     result.map((el =>  ( el.room===1 && single ++,
       el.room===2 && double ++,
       el.room===3 && triple ++)))
     
      
      const resu = await Hotel.find();
      res.status(200).send({single_room : single, double_room: double,triple_room : triple ,message: "rooms per category" ,  rest_triple_rooms : resu[0].triple_rooms,rest_persons : resu[0].rooms});
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
      const result = await Booking.deleteOne({ emails : req.user.email });
      req.user.roomMates.map(async(el) => {
      const resu = await User.updateOne(
        { _id: el},
        { $set: { booking : false ,
                  } }
      );
     })
      const resu = await User.updateOne(
          { _id: req.user._id },
          { $set: { booking : false,
                   } }
        );

        const r= await Hotel.find();
        if(req.user.roomMates.length==2)
     { const psu = await Hotel.updateOne(
        { _id: r[0]._id},
        { $set: {rooms: r[0].rooms+=req.user.roomMates.length+1 ,
                
                 triple_rooms: r[0]. triple_rooms+=1} }
      )
      
    
     }
      else {const psu = await Hotel.updateOne(
        { _id: r[0]._id},
        { $set: {rooms: r[0].rooms+=req.user.roomMates.length+1 ,
                } }
      )
      
    
      }
     res.status(200).send({message: "booking deleted" });
    } catch (error) {
      res.status(400).send({ message: "can not get bookings" });
    }
  };
  exports.deleteRoomMate=async(req,res)=>{
    try {
      if(req.user.booking) {  res.status(400).send({error : "can not delete , cancel booking first"})}
      else {const {id}=req.body
  
      console.log(id)
      let arr=[]
      let arr2=[]
      const user= await User.findById((id))
      arr = user.roomMates.filter(item => item === req.user._id )
    
        console.log(arr);
           
      let receiveuser={...user,roomMates :arr}
    
      let resuu= await User.updateOne(
        { _id: id},
        { $set: { roomMates : arr  } }
      
      );
      arr2=req.user.roomMates.filter(item => item === id)
    let resu= await User.updateOne(
      { _id: req.user._id},
      { $set: { roomMates : arr2 } }
    
    );
    res.status(200).send({message: "roomMate deleted"}) }
    } catch (error) {
      res.status(400).send({error : "can not delete"})
    }
  }