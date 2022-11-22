const jwt = require("jsonwebtoken");
require("dotenv").config();
const { successResMsg, errorResMsg } = require("../utils/appResponse");
const { AppError } = require("../utils/appError");

exports.authorize = async (req, res, next) => {
  try {
    const authorizationArr = req.headers.authorization.split(" ");
    // const authorizationArr = req.headers.authorization.at(" ")
    if (!authorizationArr.includes("Bearer")) {
      return next(new AppError("Token requires a bearer..", 401));
    }
    let token = authArray[1];
    if (!token) {
      return next(new AppError("Token is required", 401));
    }
    console.log(token);
    const decryptToken = await jwt.verify(process.env.rail_Token, {
      expiresIn: "1h",
    });
    req.user = decryptToken;
    next();
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
exports.allowAdmin = async (req, res, next) => {
  try {
    const { role } = req.user;
    if (!role === admin)
      return next(new AppError("you do not have permission to access..", 401));
    else {
      next();
    }
  } catch (error) {
    return errorResMsg(res, 500, { message: error.message });
  }
};
