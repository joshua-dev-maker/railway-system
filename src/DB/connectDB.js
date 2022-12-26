const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.DATA_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`server is running ${con.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = connectDB;
