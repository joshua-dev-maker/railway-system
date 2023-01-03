const mongoose = require("mongoose");
const trainInfo = mongoose.Schema;
const trainInfoSchema = new trainInfo(
  {
    trainName: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      required: true,
    },

    destination: {
      type: String,
      required: true,
    },
    Capacity: {
      type: Number,
      required: true,
    },
    reservation: {
      type: String,
      enum: ["economy", "business", "firstclass"],
      required: true,
    },
    price: {
      type: Number,
      enum: [2000, 3500, 5000],
      default: 2000,
      required: true,
    },

    sessions: {
      type: String,
      enum: ["morning", "afternoon", "evening"],
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// converting schemas into a model
const trainInfoModel = mongoose.model("trainInfo", trainInfoSchema);
module.exports = trainInfoModel;
