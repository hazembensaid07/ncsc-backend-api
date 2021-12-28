const Request=require("../models/request")
const User = require("../models/user");
exports.sendRequest =  (req, res) => {
  
      const {emailReceiver}=req.body
     
      const emailSender=req.user.email
      if(emailSender===emailReceiver) { return res.status(400).json({
        error: "you can not send request to your self",
      })}
      User.findOne({email: emailReceiver}).exec((err,user)=> {
          if(!user) { 
              return res.status(400).json({
            error: "User With This Email doesn't exist",
          });}
          else {
              if(user.booking) {
                return res.status(400).json({
                    error: "User is already booked in",
                  });
              }
              else {
                  Request.findOne({emailReceiver,emailSender}).exec((err,request)=> {
                      if(request ) {return res.status(400).json({
                        error: "you have already sent a request to this user",
                      });}
                      else { const lastNameReceiver=user.lastName
                        const firstNameReceiver=user.firstName
                        const lastNameSender=req.user.lastName
                        const firstNameSender=req.user.firstName

                        const requet = new Request( {emailSender,emailReceiver,lastNameReceiver,firstNameReceiver,lastNameReceiver,firstNameReceiver,lastNameSender,firstNameSender});
                        requet.save((err, user) => {
                            return res.json({
                              message: "request added.",
                              
                            });
                          });
                      }
                  } )
              }
          }
      })
  };
  exports.getsendedRequest =  async(req, res) => {
  
   try {const emailSender=req.user.email
    const result= await Request.find({emailSender: emailSender})
    
    res.status(200).send({result,msg :"requests loaded with success"})
       
   } catch (error) {
    res.status(400).send({error :"can not load requests"})
   }
   
    
  
};
exports.getReceivedRequest =  async(req, res) => {
  
    try {const emailReceiver=req.user.email
     const result= await Request.find({emailReceiver: emailReceiver})
     res.status(200).send({result,msg :"requests loaded with success"})
        
    } catch (error) {
     res.status(400).send({error :"can not load requests"})
    }
    
     
   
 };
 exports.acceptRequest=async (req,res)=> {
     try {
         const {id}=req.body
      
         const result = await Request.findById(id)
        
        
           
              const resul = await Request.updateOne(
                { _id: id },
                { $set: { status : "accepted" } }
              );
          
             const user= await User.findOne(({email: result.emailSender}))
            
           
            const newuser={...user , roomMates : user.roomMates.push(req.user._id)}
            const resu = await User.updateOne(
                { _id: user._id },
                { $set: { ...newuser } }
              );
              res.status(200).send({ message: "update success" });
        
        } catch (error) {
            res.status(400).send({error :"can not accept  request"})
            
     }
 }
 exports.refuseRequest=async (req,res)=> {
    try {
        const {id}=req.body
      
        const result = await Request.findById(id)
       
        const newreq={...result , staus: "refused"}
          
             const resul = await Request.updateOne(
               { _id: id },
               { $set: { status: "refused"} }
             );
         
             res.status(200).send({ message: "update success" });
       
       } catch (error) {
           res.status(400).send({error :"can not accept  request"})
           
    }
}
