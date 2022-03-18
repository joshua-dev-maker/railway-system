const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { successResMsg, errorResMsg } = require("../utils/appResponse");
const AppError = require("../utils/appError");
require("dotenv").config();
const { sendMail } = require("../DB/sendMail");
const { rail_Token } = process.env;
// Register a new user
exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, password, role } =
      req.body;

    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return next(new AppError("Please fill the required field", 401));
    }
    if (password.length < 10) {
      return next(new AppError("password must be at least 10 characters", 401));
    }
    if (phoneNumber.length < 11 || phoneNumber.length > 11) {
      return next(new AppError("phonenumber must be 11 digits", 401));
    }
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return next(new AppError("email already exists,Please login", 401));
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashPassword,
      role,
    });
    await newUser.save();
    const data = {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };
    const url = "theolamideolanrewaju.com";
    const token = await jwt.sign(data, rail_Token, { expiresIn: "2h" });
    let mailOptions = {
      to: newUser.email,
      subject: "Verify Email",
      text: `Hi ${firstName}, Pls verify your email. ${url}
       ${token}`,
    };
    await sendMail(mailOptions);
    return successResMsg(res, 201, {
      message: "profile created successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return errorResMsg(res, 500, { message: error.message });
  }
};
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    const decodedToken = await jwt.verify(token, rail_Token);
    // console.log(decodedToken);
    const user = await User.findOne({ email: decodedToken.email }).select(
      "isVerfied"
    );
    console.log(user.isVerfied);
    if (user.isVerfied) {
      return res.status(200).json({ message: "user verified already" });
    }
    user.isVerfied = true;
    user.save();
    return res.status(200).json({ message: "user verified successfully" });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const emailExist = await User.findOne({ email });
    if (!emailExist) {
      return next(
        new AppError("Email doens't exist, please create account", 401)
      );
    }
    const isPasswordExist = await bcrypt.compare(password, emailExist.password);
    if (!isPasswordExist) {
      return next(new AppError("password does not exist", 401));
    }; 
    if(!emailExist.isVerfied){
      return res.status(401).json({message:"User not verified"})
    }
    const data = {
      id: emailExist.id,
      email: emailExist.email,
      role: emailExist.role,
    };
    const token = await jwt.sign(data, rail_Token, { expiresIn: "2h" });

    return successResMsg(res, 200, {
      message: "login successful",
      token,
    });
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};

exports.registeredUsers = async (req, res, next) => {
  try {
    const registeredUser = await User.find();

    // await count
    return successResMsg(res, 200, {
      registeredUser,
    });
  } catch (error) {
    console.log(error);
    return errorResMsg(res, 500, { message: error.message });
  }
};
