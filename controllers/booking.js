const Booking= require("../models/booking");

const Hotel=require("../models/hotel")
exports.addbooking = async (req, res) => {
    try { 
      const {transport_phones,room,emails,transport_emails}=req.body
      const uniqueSet = new Set(emails);
      const se=new Set(transport_emails)
      const se_phones=new Set(transport_phones)
      const arr1=[...se_phones]
      const arr=[...se];
      const backToArray = [...uniqueSet];
      const book = await Booking.find().select("emails");
  
     
      if(arr.length!=transport_emails.length) {
      res.status(400).send({error: "emails _transport duplication"});}
      if  (backToArray.length!=emails.length) {
       res.status(400).send({error: "emails duplication"});}
       if  (arr1.length!=transport_phones.length) {
        res.status(400).send({error: "phones duplication"});}
      

      else { let a =true;
        for (let i=0;i< emails.length;i++) 
        { 
          for (let j=0 ;j < book.length;j++)
          {
           if( book[j].emails.includes(emails[i]))  {a=false}
           }
          }
         
        if(!a) { res.status(400).send({error: "email exists in a booking , try to put correct emails"})}
        else{
        const id_maker=req.user._id
        const transport_number=transport_emails.length;
        const booking={transport_phones,room,emails,transport_emails,id_maker,transport_number}
        const book = new Booking(booking);
        const response = await book.save();
        res.status(200).send({ message: "booking added with success" });}
        let result = await Hotel.find();
       
        result[0].rooms-=emails.length;
       
        result[0].transport-=transport_emails.length
      
        const resul = await Hotel.updateOne(
          { _id: result[0]._id },
          { $set: { ...result[0] } }
        );
      }}
       
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
  exports.loadBookingByUserId= async (req, res) => {
   
    try {
        //get the id from params
        const id = req.user._id
        //lauch findById query
        const result = await Booking.find({id_maker :id});
    
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
