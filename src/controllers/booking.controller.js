const bookATrain = require("../models/booking.model");
const User = require("../models/user.model");
const Flights = require("../models/flight");
const { successResMsg, errorResMsg } = require("../utils/appResponse");
const { AppError } = require("../utils/appError");
const path = require("path");
const cloudinary = require("../utils/cloudinary");
const axios = require("axios");
// const { url } = require("inspector");
// const { getMaxListeners } = require("process");
const dotenv = require("dotenv").config();
//registration of Transporters
exports.findAtrain = async (req, res, next) => {
  try {
    const { origin, destination } = req.body;
    const search = await Flights.sort(destination);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.trainTicket = async (req, res, next) => {
  try {
    const { _id } = req.query;
    const { fullName, address, destination, reservation, time, date } =
      req.body;
    const user = await User.findOne({ _id });
    if (!user) {
      return res.status(404).json({
        message: "No such user",
      });
    }
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
    const totalBooking = await bookATrain
      .find()
      .select("destination")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ updatedAt: -1 })
      .exec();
    return res.successResMsg(res, 200, { totalBooking });
  } catch (error) {
    console.log(error);
    return res.errorResMsg(res, 500, { message: "error.message" });
  }
};
// editing Transporters information

exports.updateTrainTime = async (req, res, next) => {
  try {
    const { _id } = req.headers;
    const { time } = req.body;
    if (!time) {
      return res.status(401).json({
        success: false,
        message: "only train time can be updated",
      });
    }
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
exports.payment = async (req, res, next) => {
  try {
    console.log("here...........................");
    console.log(process.env.payStack_secret_key);
    const data = await axios({
      url: "https://api.paystack.co/transaction/initialize",
      method: "post",
      headers: {
        Authorization: `Bearer ${process.env.payStack_secret_key}`,
      },
      data: {
        email: "temitopejulius99@gmail.com",
        amount: "4000",
      },
    });
    console.log(data);
    return res.status(200).json({
      data: data.data.data,
    });
  } catch (error) {
    console.log(error);
    message: error;
  }
};

exports.paymentVerification = async (req, res, next) => {
  try {
    const { reference } = req.query;
    console.log("here...........................");
    console.log(process.env.payStack_secret_key);
    const data = await axios({
      url: `https://api.paystack.co/transaction/verify/${reference}`,
      method: "get",
      headers: {
        Authorization: `Bearer ${process.env.payStack_secret_key}`,
      },
      // data: {
      //   email: "temitopejulius99@gmail.com",
      //   amount: "4000",
      // },
    });
    console.log(data);
    return res.status(200).json({
      data: data.data.data.gateway_response,
    });
  } catch (error) {
    console.log(error);
    message: error;
  }
};
