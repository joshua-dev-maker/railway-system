const mongoose = require("mongoose");
const Admin = mongoose.Schema;

//information for a new admin trying to use the train for the first time.
const AdminSchema = new Admin(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      toLowerCase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      required: true,
    },
  },
  { timestamps: true }
);
const adminModel = mongoose.model("Admin", AdminSchema);
module.exports = adminModel;
