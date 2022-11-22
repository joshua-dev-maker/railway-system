const express = require("express");
const connectDB = require("./src/DB/connectDB");
const auth = require("./src/routes/auth");
const ticketRouter = require("./src/routes/booking.route");
const AdminRouter = require("./src/routes/admin.route");
const swaggerUi = require("swagger-ui-express");
const logger = require("./src/utils/logger");
require("dotenv").config();

// using express as a middleware
const app = express();

app.use(express.json());
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const startServer = async () => {
  const PORT = process.env.PORT;
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`
    ==============================================
    🛡️  Server listening on port: ${PORT}
    🧰  In ${process.env.NODE_ENV} mode
    ==============================================`);
  });
};

startServer();
// const PORT = process.env.PORT;
// connectDB();

// baseurl for railsystem
app.get("/", (req, res) => {
  res.send({
    message: "Homepage",
  });
});
// using the router for each model
app.use("/api/v1/auth", auth);
app.use("/api/v1/booking", ticketRouter);
app.use("/api/v1", AdminRouter);

// app.listen(PORT, () => {
//   console.log(`server listening on http://localhost:${PORT}`);
// });
