const errorMsgs = require("../constants/errorMsgs");

class CustomError extends Error {
  /* istanbul ignore next */
  constructor(statusCode, message = errorMsgs.DEFAULT, stack = "") {
    super(message);
    this.name = "CustomError";
    this.statusCode = statusCode;
    if (!stack) Error.captureStackTrace(this, this.constructor);
    else this.stack = stack;
  }
}

module.exports = CustomError;
