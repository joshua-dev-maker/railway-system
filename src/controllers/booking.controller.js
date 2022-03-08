const bookATrain = require("../models/booking.model");
const { successResMsg, errorResMsg } = require("../utils/appResponse");
const { AppError } = require("../utils/appError");
//registration of Transporters
exports.trainTicket = async (req, res, next) => {
  try {
    const { fullName, address, destination, reservation, time, date } =
      req.body;
    if (!fullName || !address || !destination || !reservation || !time || !date)
      return res.status(400).json({
        message: "please fill the required fields",
      });

    const ticket = await bookATrain.create({
      fullName,
      address,
      destination,
      reservation,
      time,
      date,
    });
    return res.status(201).json({
      success: true,
      ticket,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// taking into account total number of Transporters

exports.totalBookings = async (req, res, next) => {
  try {
    const totalBooking = await bookATrain.find();
    // if(!countTransporter) throw

    // await count
    return res.successResMsg(res, 200, { message: "ok", totalBooking });
  } catch (error) {
    console.log(error);
    return res.errorResMsg(res, 500, { message: "error.message" });
  }
};
// editing Transporters information

exports.updateTrainTime = async (req, res, next) => {
  try {
    const { time } = req.body;
    if (!req.body.time) {
      return res.status(401).json({
        success: false,
        message: "only train time can be updated",
      });
    }
    const { _id } = req.headers;

    const updateTrainTime = await bookATrain.findOneAndUpdate(
      { _id },
      req.body,
      {
        new: true,
      }
    );
    return res.successResMsg(res, 200, {
      message: "ok",
      updateTrainTime,
    });
  } catch (error) {
    console.log(error);
    return res.errorResMsg(res, 500, {
      message: error.message,
    });
  }
};

// deleting transporters information
exports.deleteBooking = async (req, res, next) => {
  try {
    const { _id } = req.headers;
    const deleteBooking = await bookATrain.findOneAndDelete({ _id });
    return res.successResMsg(res, 200, {
      message: `This booking has been cancelled`,
    });
  } catch (error) {
    console.log(error);
    return res.errorResMsg(res, 500, {
      message: error.message,
    });
  }
};
