const winston = require("winston");
const {
  timestamp: timestampFn,
  combine,
  colorize,
  prettyPrint,
  printf,
} = winston.format;

// Format function
const myFormat = printf(
  ({ level, message, timestamp }) => `${timestamp}: [${level}] -> ${message} `
);

const logger = winston.createLogger({
  format: winston.format.json(),
  transports: [
    // - Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({ filename: "error.log", level: "error" }),

    // - Write all logs with importance level of `info` or less to `info.log`
    new winston.transports.File({ filename: "info.log" }),
  ],
});

winston.addColors({
  info: "green",
  error: "red",
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), timestampFn(), prettyPrint(), myFormat),
    })
  );
}

module.exports = logger;
