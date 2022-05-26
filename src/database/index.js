require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const mongoose = require("mongoose");
const chalk = require("chalk");
const CustomError = require("../utils/CustomError");
const httpStatus = require("http-status");
const { logger } = require("./../utils/global");

const URL = process.env.NODE_ENV === "test" ? global.__DB_URL__ : process.env.MONGOHOST || process.env.DB_URL;

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

const connect = async (URI = URL) => {
  try {
    const options = {
      serverSelectionTimeoutMS: 15000,
      dbName: process.env.DB_NAME,
    };
    await mongoose.connect(URI, options);
    process.env.NODE_ENV === "local" && mongoose.set("debug", true);
  } catch (e) {
    logger.log({
      level: "error",
      message: `DB Error`,
      details: e,
    });
    // Fallback at initial connection here
  }
};

mongoose.connection.on("connected", () => {
  console.log(connected(`Mongoose (version: ${mongoose.version}) default connection is open to ${URL}`));
});

mongoose.connection.on("error", (err) => {
  console.log(error("Mongoose default connection has occurred " + err + " error"));
});

mongoose.connection.on("disconnected", () => {
  process.env.NODE_ENV !== "test" && console.log(disconnected("Mongoose default connection is disconnected"));
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log(termination("Mongoose default connection is disconnected due to application termination"));
    process.exit(0);
  });
});

const getDb = () => {
  try {
    if (mongoose && mongoose.connection) return mongoose.connection.db;
  } catch (e) {
    logger.log({
      level: "error",
      message: `DB Error`,
      details: e,
    });
  }
  throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR);
};

const getCollection = async (colName = "") => {
  try {
    const { db } = mongoose.connection;
    return await db.collection(colName);
  } catch (e) {
    logger.log({
      level: "error",
      message: `DB Error`,
      details: e,
    });
  }
  throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR);
};

const truncate = async () => {
  const { db } = mongoose.connection;
  const collections = await db.collections();
  const promises = collections.map((collection) => collection.deleteMany());
  await Promise.all(promises);
};

const disconnect = async () => {
  mongoose?.disconnect();
};

module.exports = {
  connect,
  getDb,
  getCollection,
  truncate,
  disconnect,
  // cleanup,
};
