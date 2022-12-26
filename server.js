const express = require("express");
const connectDB = require("./src/DB/connectDB");
const auth = require("./src/routes/auth");
const ticketRouter = require("./src/routes/booking.route");
const AdminRouter = require("./src/routes/admin.route");
const logger = require("./src/utils/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
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

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "A railway project",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:0901/",
      },
    ],
  },
  apis: ["./server.js"],
};

const swaggerSpec = swaggerJSDoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// baseurl for railsystem
app.get("/", (req, res) => {
  res.send({
    message: "Homepage",
  });
});

/**
 * @swagger
 * /api/v1/auth:
 * post:
 *  summary: To get all bookings from the database
 *  description: this api is used to get data
 *  responses:
 *    200:
 *       description: this api is used to get all bookings from the database
 *       content:
 *              application/json
 */
// using the router for each model
app.use("/api/v1/auth", auth);
/**
 * @swagger
 * /api/booking:
 * get:
 *  summary: To get all bookings from the database
 *  description: this api is used to get data
 *  responses:
 *    200:
 *       description: this api is used to get all bookings from the database
 *       content:
 *              application/json
 */
app.get("/api/booking", ticketRouter);
app.use("/api/v1", AdminRouter);

// app.listen(PORT, () => {
//   console.log(`server listening on http://localhost:${PORT}`);
// });
