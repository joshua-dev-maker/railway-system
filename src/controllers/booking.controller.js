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
    if (!search) {
      return res
        .status(404)
        .json({ message: "No train available for this location" });
    }
    return res.status(200).json({ message: search });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// const { deliveryType, reference_code, returnDate, pickUpDate } = req.body;

//     const { car_ids } = req.query;
//     console.log("query", car_ids);
//     const rentedCars = [];
//     let amount = [];
//     const dateOne = new Date(returnDate);
//     const dateTwo = new Date(pickUpDate);
//     const time_difference = dateOne.getTime() - dateTwo.getTime();
//     const numberOfDays = time_difference / (1000 * 3600 * 24);

//     let rentedCarsDescription = "";
//     let total = 0;
//     let totalRent = 1;
//     // Condition and logic to loop through array of selected cars or a single selected car for rentals and populating their details
//     if (
//       typeof req.query.car_ids === "string" ||
//       typeof req.query.car_ids === "number"
//     ) {
//       req.query.car_ids = req.query.car_ids.toString().split();
//       rentalDetails = await pool.query("SELECT * FROM Car WHERE id = $1", [
//         car_ids,
//       ]);
//       // console.log(rentalDetails.rows);
//       let total = "";
//       if (rentalDetails.rows[0] == null || rentalDetails.rows.length == 0) {
//         return res.status(400).json({
//           message: `the car with id ${car_ids} is not available at the moment...`,
//         });
//       } else {
//         description = `${rentalDetails.rows[0].transmission} ${rentalDetails.rows[0].manufacturer} ${rentalDetails.rows[0].brand} ${rentalDetails.rows[0].year} model with id of ${rentalDetails.rows[0].id} (#${rentalDetails.rows[0].rentperhour} per day)`;
//         amount.push(parseInt(rentalDetails.rows[0].rentperhour));
//         rentedCars.push(description);
//         rentedCarsDescription = description;
//         total = rentalDetails.rows[0].rentperhour;
//       }
//       totalRent = total * numberOfDays;
//     } else {
//       for (car_id of req.query.car_ids) {
//         rentalDetails = await pool.query("SELECT * FROM Car WHERE id = $1", [
//           car_id,
//         ]);
//         if (rentalDetails.rows[0] == null || rentalDetails.rows.length == 0) {
//           return res.status(400).json({
//             message: `This car with id ${car_id} is not available at the moment...`,
//           });
//         } else {
//           description = `${rentalDetails.rows[0].geartype} ${rentalDetails.rows[0].carname} ${rentalDetails.rows[0].brandname} ${rentalDetails.rows[0].caryear} model with id of ${rentalDetails.rows[0].id} (#${rentalDetails.rows[0].rentperday} per day)`;
//           amount.push(parseInt(rentalDetails.rows[0].rentperhour));
//           rentedCars.push(description);
//         }
//       }
//       rentedCarsDescription = rentedCars.join(` , `);

//       for (num of amount) {
//         total = total + num;
//       }
//       totalRent = total * numberOfDays;
//     }

//     const userData = await User.findOne({ mongoUserId });
//     // Assigning Users datas to the new rental to be created
//     firstName = userData.firstName;
//     lastName = userData.lastName;
//     email = userData.email;
//     // Setting a default date to the date column on the table
//     const today = new Date();
//     const date = `${today.getFullYear()}-${
//       today.getMonth() + 1
//     }-${today.getDate()}`;
//     const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
//     let dateAndTime = `${date} ${time}`;
//     transactionDate = dateAndTime;
//     paymentStatus = "Not Paid Or Unsuccessful";
//     carId = req.query.car_ids.toString("").split(",");

//     const newRental = await pool.query(
//       "INSERT INTO Rentals (user_mongodb_id, firstName, lastName, email, Car_ids, car_description, deliveryType, reference_code, pickUpDate, returnDate, totalAmount, paymentStatus, transactionDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
//       [
//         mongoUserId,
//         firstName,
//         lastName,
//         email,
//         carId,
//         rentedCarsDescription,
//         deliveryType,
//         reference_code,
//         pickUpDate,
//         returnDate,
//         totalRent,
//         paymentStatus,
//         transactionDate,
//       ]
//     );
//     console.log("newRental.rows[0]", newRental.rows[0]);
//     req.session.rental_id = newRental.rows[0].id;
//     console.log("req.session.rental_id", req.session.rental_id);
//     return res.status(201).json({
//       message: `New rent initiated.`,
//       newRental: newRental.rows[0],
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: `${error.message}, Please try again later.`,
//     });
//   }
// };

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
    const { time: departureTime, returnTime } = req.body;
    if (!departureTime || !returnTime) {
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
