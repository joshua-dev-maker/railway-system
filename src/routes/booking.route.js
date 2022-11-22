const express = require("express");
const { uploader } = require("../utils/multer");
const ticket = require("../controllers/booking.controller");
const { authorize, allowAdmin } = require("../middleware/auth.middleware");
const router = express.Router();

// router.post("/booking", upload.single("pictures"), ticket.trainTicket);
// router.post("/upload", ticket.trainTicket);

// router.post(
//   "/booking",
//   // uploader.array("pictures"),
//   ticket.trainTicket
// );
router.patch("/updateTrainTime", ticket.updateTrainTime);
router.delete("/deleteBooking", ticket.deleteBooking);
router.get("/totalBooking", authorize, allowAdmin, ticket.totalBookings);
router.post("/payment/init", ticket.payment);
router.get("/payment/verify", ticket.paymentVerification);

module.exports = router;
