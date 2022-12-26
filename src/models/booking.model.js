const mongoose = require("mongoose");

const bookATrain = mongoose.Schema;
const bookATrainSchema = new bookATrain(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {
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
    passengers: {
      type: Number,
      required: true,
    },
    reservation: {
      type: String,
      enum: ["economy", "business", "firstclass"],
      required: true,
    },
    time: {
      departureTime: {
        type: String,
        enum: ["morning", "afternoon", "evening"],
        required: true,
      },
      returnTime: {
        type: String,
        enum: ["morning", "afternoon", "evening"],
        required: true,
      },
    },

    departureDate: {
      type: Date,
      required: true,
    },
    returnDate: {
      type: Date,
      required: true,
    },
    // bookUrl: {
    //   type: [String],
    // },
  },
  { timestamps: true }
);

// converting schemas into a model
const bookATrainModel = mongoose.model("bookATrain", bookATrainSchema);
module.exports = bookATrainModel;
