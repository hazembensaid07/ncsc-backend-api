const Booking= require("../models/booking");


exports.addbooking = async (req, res) => {
    try {
      const {tel,room,emails,transport_emails}=req.body
     
      const id_maker=req.user._id
      const transport_number=transport_emails.length;
      const booking={tel,room,emails,transport_emails,id_maker,transport_number}
      const book = new Booking(booking);
      const response = await book.save();
      res.status(200).send({ message: "booking added with success" });
    } catch (error) {

      res.status(400).send(error,"can not save it");
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
          res.send({ message: "booking   found ", result });
        }
      } catch (error) {
        res.status(400).send({ message: "try later cannot respond" });
      }
  };
  
  exports.loadBookings= async (req, res) => {
    try {
      const result = await Booking.find();
      
      res.send({ response: result, message: "bookings  found" });
    } catch (error) {
      res.status(400).send({ message: "can not get bookings" });
    }
  };
  exports.Transportplaces= async (req, res) => {
    try {
       let  places=0;
      const result = await Booking.find();
      result.map((el => places +=el.transport_number))
      res.send({ place: places, message: "bus places" });
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
      result.map((el =>  ( el.room===1 && single ++,
        el.room===2 && double ++,
        el.room===3 && triple ++)))
      res.send({single_room : single, double_room: double,triple_room : triple ,message: "rooms per category" });
    } catch (error) {
      res.status(400).send({ message: "can not get rooms" });
    }
  };
  