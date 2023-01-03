const Trains = require("../models/flight");
const Admin = require("../models/admin.model");
const { trainValidate } = require("../middleware/validation");

const createTrain = async (req, res, next) => {
  try {
    const {
      Name,
      origin,
      destination,
      capacity,
      reservation,
      price,
      session,
      time,
    } = req.body;
    const approvedTrain = await trainValidate.validateAsync(req.body);
    const trainExist = await Trains.findOne({ Name: trainValidate.Name });
    if (trainExist) {
      return res.status(400).json({ message: "Train already exists" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
