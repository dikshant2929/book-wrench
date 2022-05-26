const httpStatus = require("http-status");
const CustomError = require("../utils/CustomError");
const { ValidationError } = require("express-validation");
const { logger } = require("./../utils/global");

const config = process.env.NODE_ENV;

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (error instanceof ValidationError) {
    if (!error.stack) Error.captureStackTrace(error, errorConverter);
    error.details = JSON.stringify(error.details);
  } else if (!(error instanceof CustomError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new CustomError(statusCode, message, error.stack);
  }
  next(error);
};

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
const errorHandler = (err, req, res, next) => {
  if (config !== "test") {
    logger.log({
      ...err,
      level: "error",
      message: err.message,
      details: err,
    });
  }

  return res.status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
    type: err.name,
    message: err.message,
    ...(config === "development" && { ...err }),
  });
};

module.exports = {
  errorConverter,
  errorHandler,
};
