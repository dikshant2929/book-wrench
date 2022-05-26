"use strict";
// App
const app = require("./app");
const { logger } = require("./utils/global");

// Constants
/* istanbul ignore next */
const PORT = process.env.NODE_PORT || 4002;
const HOST = "0.0.0.0";

const server = app.listen(PORT, HOST);
logger.log({
  level: "info",
  message: `NODE_ENV: ${process.env.NODE_ENV}, DB: ${process.env.DB_NAME}`,
});
logger.log({
  level: "info",
  message: `Server ready at http://${HOST}:${PORT}`,
});

module.exports = server;
