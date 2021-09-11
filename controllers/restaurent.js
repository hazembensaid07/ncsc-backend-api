const Restaurent = require("../models/restaurent");
exports.addRestaurent = async (req, res) => {
  try {
    const restaurent = new Restaurent(req.body);
    const response = await restaurent.save();
    res.status(200).send({ message: "restaurent added with success" });
  } catch (error) {
    res.status(400).send("can not save it");
  }
};
exports.loadAllRestaurents = async (req, res) => {
  try {
    const result = await Restaurent.find();

    res.send({ response: result, message: "restaurents  found" });
  } catch (error) {
    res.status(400).send({ message: "can not get restaurents" });
  }
};
exports.loadRestaurent = async (req, res) => {
  try {
    //get the id from params
    const id = req.params.id;
    //lauch findById query
    const result = await Restaurent.findById(id);

    if (!result) {
      res.status(400).send({ msg: "there is no restaurnet  " });
      return;
    } else {
      res.send({ message: "restaurent  found ", result });
    }
  } catch (error) {
    res.status(400).send({ message: "try later cannot respond" });
  }
};
exports.updateRestaurent = async (req, res) => {
  try {
    const restau = req.body;
    const id = req.params.id;
    const result = await Restaurent.updateOne(
      { _id: id },
      { $set: { ...restau } }
    );
    res.status(200).send({ message: "update success" });
  } catch (error) {
    res.status(400).send("No restau  exist with that ID");
  }
};
exports.deleteRestaurent = async (req, res) => {
  try {
    const result = await Restaurent.deleteOne({ _id: req.params.id });
    result.n
      ? res.status(200).send({ message: "Restaurent  deleted" })
      : res.send("there is no restaurent  with this id");
  } catch (error) {
    res.send("try later something went wrong ");
  }
};
