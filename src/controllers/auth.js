const User = require("../models/user.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { successResMsg, errorResMsg } = require("../utils/appResponse");
const AppError = require("../utils/appError");
const {
  validateSignup,
  validateLogin,
  changePasswordValidate,
  forgotPasswordValidate,
  urlValidate,
} = require("../middleware/validation");
require("dotenv").config();
const { sendMail } = require("../DB/sendMail");
const { rail_Token } = process.env;
const { signupTemplate } = require("../utils/signuptemplate");
// Register a new user
exports.signup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      country,
      idCardNumber,
      role,
    } = req.body;
    if (!phoneNumber.startsWith("+234")) {
      return AppErrorMsg(res, 400, {
        status: "FAIL",
        message: "Invalid phone number format",
      });
    }
    // if (!firstName || !lastName || !phoneNumber || !email || !password) {
    //   return next(new AppError("Please fill the required field", 401));
    // }
    // if (password.length < 10) {
    //   return next(new AppError("password must be at least 10 characters", 401));
    // }
    // if (phoneNumber.length < 11 || phoneNumber.length > 11) {
    //   return next(new AppError("phonenumber must be 11 digits", 401));
    // }
    // const emailExists = await User.findOne({ email });
    // if (emailExists) {
    //   return next(new AppError("email already exists,Please login", 401));
    // }
    const userValidated = await validateSignup.validateAsync(req.body);
    const emailExists = await User.findOne({ email: userValidated.email });
    if (emailExists) {
      return next(new AppError("email already exists,Please login", 401));
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName: userValidated.firstName,
      lastName: userValidated.lastName,
      phoneNumber: userValidated.phoneNumber,
      email: userValidated.email,
      idCardNumber: userValidated.idCardNumber,
      password: hashPassword,
      country: userValidated.country,
      role,
    });
    await newUser.save();
    const data = {
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };

    const token = await jwt.sign(data, rail_Token, { expiresIn: "2h" });

    // let mailOptions = {
    //   to: newUser.email,
    //   subject: "Verify Email",
    //   text: `Hi ${firstName}, Pls verify your email.
    //    ${token}`,
    // };
    // await sendMail(mailOptions);
    await sendMail({
      to: newUser.email,
      subject: "verify email",
      html: await signupTemplate(token),
    });
    return successResMsg(res, 201, {
      message: "profile created successfully",
      newUser,
      token,
    });
  } catch (error) {
    // console.log(error);
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
    // console.log(user.isVerfied);
    if (user.isVerfied) {
      return res.status(400).json({ message: "user verified already" });
    }
    user.isVerfied = true;
    user.save();
    return res.status(200).json({ message: "user verified successfully" });
  } catch (error) {
    throw new error("something went wrong", { cause: error });
  }
};
exports.login = async (req, res, next) => {
  try {
    // const { email, password } = req.body;
    const ValidateUserLogin = await validateLogin.validateAsync(req.body);
    const emailExist = await User.findOne({ email: ValidateUserLogin.email });
    if (!emailExist) {
      return next(
        new AppError("Email doens't exist, please create account", 401)
      );
    }
    const isPasswordExist = await bcrypt.compare(
      ValidateUserLogin.password,
      emailExist.password
    );
    if (!isPasswordExist) {
      return next(new AppError("password does not exist", 401));
    }
    if (!emailExist.isVerfied) {
      return res.status(401).json({ message: "User not verified" });
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
exports.forgotPasswordUrl = async (req, res, next) => {
  try {
    const ValidateUrl = await urlValidate.validateAsync(req.body);
    const userEmail = await User.findOne({ email: ValidateUrl.email });
    if (!userEmail) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = {
      id: userEmail.id,
      email: userEmail.email,
    };

    const token = await jwt.sign(data, rail_Token, { expiresIn: "2h" });
    let mailOptions = {
      to: userEmail.email,
      subject: "Reset Password",
      text: `Hi ${userEmail.firstName}, Reset your password with the link below.${token}`,
    };
    await sendMail(mailOptions);
    return res.status(200).json({
      message: `hi ${userEmail.firstName},Reset Password`,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.ChangePassword = async (req, res, next) => {
  try {
    const ValidateChangePassword = await changePasswordValidate.validateAsync(
      req.body
    );
    const { _id } = req.headers;
    const loggedInUser = await User.findOne({ _id: _id });
    const headersTokenID = await jwt.verify(
      req.headers.authorization.split("")[1],
      process.env.rail_Token
    ).id;
    if (headersTokenID !== loggedInUser._id) {
      return AppError("user not found", 404);
    }

    const passwwordMatch = await bcrypt.compare(
      ValidateChangePassword.oldPassword,
      loggedInUser.password
    );
    if (!passwwordMatch) return AppErrorMsg("wrong password", 401);
    if (
      ValidateChangePassword.oldPassword === ValidateChangePassword.newPassword
    ) {
      return next(new AppError("this password can't be used", 401));
    }
    if (
      ValidateChangePassword.newPassword !==
      ValidateChangePassword.confirmPassword
    ) {
      return next(new AppError("password does not match", 401));
    }

    const hashPass = await bcrypt.hash(ValidateChangePassword.newPassword, 10);
    const updatePassword = await User.updateOne(
      { _id },
      { password: hashPass }
    );

    return res.status(200).json({
      success: true,
      message: "password changed",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.forgotPassword = async (req, res, next) => {
  try {
    const ValidateForgotPassword = await forgotPasswordValidate.validateAsync(
      req.body
    );

    const { email, token } = req.headers;
    const decoded_token = await jwt.verify(token, rail_Token);
    if (decoded_token.email !== email) {
      return res.status(403).json({
        message: "Invalid email",
      });
    }

    if (
      ValidateForgotPassword.newPassword !==
      ValidateForgotPassword.confirmPassword
    ) {
      return res.status(403).json({
        message: "Password does not match",
      });
    }

    const hashPass = await bcrypt.hash(
      ValidateForgotPassword.confirmPassword,
      10
    );

    const UpdatedPass = await User.updateOne(
      { email },
      { password: hashPass },
      { new: true }
    );
    return res.status(200).json({ message: "password updated successfully" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//     const loggedUser = await User.findById(_id);

//     const headerTokenId = await jwt.verify(
//       req.headers.authorization.split(" ")[1],
//       process.env.User_Token
//     ).id;

//     if (headerTokenId !== loggedUser._id) {
//       return res.status(404).json({
//         status: "Invalid",
//         message: "invalid User",
//       });
//     }
//     const passwwordMatch = await bcrypt.compare(
//       oldPassword,
//       loggedUser.password
//     );

//     if (!passwwordMatch)
//       return res
//         .status(401)
//         .json({ message: "password not same as previous password" });
//     if (oldPassword === newPassword)
//       return res
//         .status(401)
//         .json({ message: "password same as previous password" });

//     if (newPassword !== confirmPassword)
//       return res.status(401).json({ message: "password does not match" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };

// exports.registeredUsers = async (req, res, next) => {
//   try {
//     const registeredUser = await User.find();

//     // await count
//     return successResMsg(res, 200, {
//       registeredUser,
//     });
//   } catch (error) {
//     console.log(error);
//     return errorResMsg(res, 500, { message: error.message });
//   }
// };
