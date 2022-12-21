const Request = require("../models/request");
const User = require("../models/user");
exports.sendRequest = (req, res) => {
  const { emailReceiver } = req.body;

  const emailSender = req.user.email;
  if (emailSender === emailReceiver) {
    return res.status(406).json({
      error: "you can not send request to your self",
    });
  }
  if (req.user.rooMates == 1) {
    return res.status(401).json({
      error: "User With This Email is not available",
    });
  }
  User.findOne({ email: emailReceiver }).exec((err, user) => {
    if (!user) {
      return res.status(402).json({
        error: "User With This Email doesn't exist",
      });
    }
    if (user.roomMates.length == 2) {
      return res.status(403).json({
        error: "User have 2 roomates",
      });
    }
    if (user.roomMates.length + req.user.roomMates.length + 1 > 2) {
      return res.status(401).json({
        error: "User With This Email is not available",
      });
    } else {
      if (user.booking) {
        return res.status(404).json({
          error: "User is already booked in",
        });
      } else {
        Request.findOne({ Sender: req.user._id, Receiver: user._id }).exec(
          (err, request) => {
            if (request) {
              return res.status(405).json({
                error: "you have already sent a request to this userr",
              });
            } else {
              if (req.user.roomMates.includes(user.id)) {
                return res.status(405).json({
                  error: "you have already sent a request to this user",
                });
              } else {
                const Sender = req.user._id;
                const Receiver = user._id;

                const requet = new Request({ Sender, Receiver });
                requet.save((err, user) => {
                  return res.status(200).json({
                    message: "request added.",
                  });
                });
              }
            }
          }
        );
      }
    }
  });
};
exports.getsendedRequest = async (req, res) => {
  try {
    const id = req.user._id;
    const result = await Request.find({ Sender: id })
      .populate("Sender")
      .select("email firstName lastName")
      .populate("Receiver")
      .select("email firstName lastName");
    res.status(200).send({ result, msg: "requests loaded with success" });
  } catch (error) {
    res.status(401).send({ error: "can not load requests" });
  }
};
exports.getReceivedRequest = async (req, res) => {
  try {
    const id = req.user._id;
    const result = await Request.find({ Receiver: id })
      .populate("Sender")
      .select("email firstName lastName")
      .populate("Receiver")
      .select("email firstName lastName");
    res.status(200).send({ result, msg: "requests loaded with success" });
  } catch (error) {
    res.status(401).send({ error: "can not load requests" });
  }
};
//update the roommates for both sender  ,receiver and their roomates if exists
exports.acceptRequest = async (req, res) => {
  try {
    const { id } = req.body;

    const result = await Request.findById(id).populate("Sender").select("_id");
    const user = await User.findOne({ email: result.Sender.email });

    let receiveuser = {
      ...req.user,
      roomMates: req.user.roomMates.push(user._id),
    };
    let resupu = await User.updateOne(
      { _id: req.user._id },
      { $set: { ...receiveuser } }
    );
    if (user.roomMates.length > 0) {
      user.roomMates.map(async (el) => {
        let user = await User.findById(req.user._id);
        let newusr = { ...user, roomMates: user.roomMates.push(el) };
        let resuu = await User.updateOne(
          { _id: req.user._id },
          { $set: { ...newusr } }
        );
      });
    }
    if (user.roomMates.length > 0) {
      user.roomMates.map(async (el) => {
        let user = await User.findById(el);
        let newusr = { ...user, roomMates: user.roomMates.push(req.user._id) };
        let resuu = await User.updateOne({ _id: el }, { $set: { ...newusr } });
      });
    }
    const newuser = { ...user, roomMates: user.roomMates.push(req.user._id) };
    const resu = await User.updateOne(
      { _id: user._id },
      { $set: { ...newuser } }
    );

    const re = await Request.deleteOne({ _id: result._id });
    res.status(200).send({ message: "update success" });
  } catch (error) {
    res.status(401).send({ error: "can not accept  request" });
  }
};
exports.refuseRequest = async (req, res) => {
  try {
    const result = await Request.deleteOne({ _id: req.body.id });
    result.n
      ? res.status(200).send({ message: "Request  refused" })
      : res.status(402).send("there is no request  with this id");
  } catch (error) {
    res.status(401).send({ error: "can not refuse  request" });
  }
};
