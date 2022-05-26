require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const express = require("express");
const routes = require("../routes");
const databaseHelper = require("../database");
const { errorConverter, errorHandler } = require("../middlewares/error");
const logger = require("../middlewares/logger");
const cors = require('cors')

class App {
  constructor() {
    this.express = express();
    this.database();
    this.middlewares();
    this.logger();
    this.routes();
    this.errorHandler();
  }

  database() {
    /* istanbul ignore next */
    // process.env.NODE_ENV !== "test" &&
    databaseHelper.connect();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
  }

  logger() {
    this.express.use(logger);
  }

  routes() {
    //App Routes
    this.express.use(routes);
  }

  errorHandler() {
    // convert & handle error
    this.express.use(errorConverter);
    this.express.use(errorHandler);
  }
}

module.exports = new App().express;
