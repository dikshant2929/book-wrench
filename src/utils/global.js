const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, json, prettyPrint, colorize, uncolorize } = format;
const config = process.env.NODE_ENV;

module.exports = {
  logger: createLogger({
    format: combine(
      label({ label: `book-wrench-${config}` }),
      timestamp({ format: "YYYY-MM-DD hh:mm:ss A" }),
      config !== "local" ? json() : prettyPrint(),
      config !== "local" ? uncolorize() : colorize({ all: true })
    ),
    transports: [new transports.Console()],
  }),
  getReqDurationInMs: (startTime) => {
    const NS_PER_SEC = 1e9; // convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(startTime);
    return ((diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS).toFixed(2);
  },
};
