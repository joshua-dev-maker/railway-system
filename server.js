const express = require("express");
const connectDB = require("./src/DB/connectDB");
const UserRouter = require("./src/routes/user.route");
const ticketRouter = require("./src/routes/booking.route");
const AdminRouter = require("./src/routes/admin.route");
require("dotenv").config();

// using express as a middleware
const app = express();

app.use(express.json());

const PORT = process.env.PORT;
connectDB();

// baseurl for railsystem
app.get("/", (req, res) => {
  res.send({
    message: "Homepage",
  });
});
// using the router for each model
app.use("/api/v1", UserRouter);
app.use("/api/v1", ticketRouter);
app.use("/api/v1", AdminRouter);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
