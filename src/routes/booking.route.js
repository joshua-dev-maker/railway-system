const express = require("express");
const ticket = require("../controllers/booking.controller");
const { authorize, allowAdmin } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/booking", ticket.trainTicket);
router.patch("/updateTrainTime", ticket.updateTrainTime);
router.delete("/deleteBooking", ticket.deleteBooking);
router.get("/totalBooking", authorize, allowAdmin, ticket.totalBookings);

module.exports = router;
