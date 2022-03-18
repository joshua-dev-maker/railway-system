const mongoose = require("mongoose");
const User = mongoose.Schema;

//information for a new user/admin trying to use the train for the first time.
const UserSchema = new User(
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
    isVerfied:{
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "User",
    },
  },
  { timestamps: true }
);
const userModel = mongoose.model("User", UserSchema);
module.exports = userModel;

// User.create = async (newUser) => {
//     let insert = await sql.query("INSERT INTO user SET ?", newUser);
//     if( insert.insertId ) {
//         return insert.insertId;
//     }
//     else {
//         return;
//     }
// };
