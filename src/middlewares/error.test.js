const httpStatus = require("http-status");

const { ValidationError } = require("express-validation");
const CustomError = require("../utils/CustomError");
const { errorHandler, errorConverter } = require("./error");
const errorMsgs = require("../constants/errorMsgs");

describe("Error", () => {
  describe("errorConverter", () => {
    it("Validate CustomError, should return same error signature", async () => {
      const err = new CustomError(httpStatus.BAD_REQUEST, errorMsgs.USER_NOT_FOUND);
      const req = {};
      const res = {};

      await errorConverter(err, req, res, (error) => {
        expect(error.name).toBe("CustomError");
        expect(error.message).toBe(errorMsgs.USER_NOT_FOUND);
        expect(error.statusCode).toBe(httpStatus.BAD_REQUEST);
      });
    });

    it("Validate ValidationError, should return same error signature", async () => {
      const err = new ValidationError("Validation Failed", {
        statusCode: httpStatus.BAD_REQUEST,
      });
      const req = {};
      const res = {};
      errorConverter(err, req, res, (error) => {
        expect(error.name).toBe("ValidationError");
        expect(error.message).toBe("Validation Failed");
        expect(error.statusCode).toBe(httpStatus.BAD_REQUEST);
      });
    });

    it("Validate Error, should return instance of CustomError", async () => {
      const err = new Error("Test Error");
      const req = {};
      const res = {};
      errorConverter(err, req, res, (error) => {
        expect(error.name).toBe("CustomError");
        expect(error.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
      });
    });
  });

  describe("errorHandler", () => {
    it("validate errorHandler", async () => {
      const err = {
        statusCode: httpStatus.BAD_REQUEST,
        message: "Test Error handler",
        name: "Test",
      };
      const req = {};
      const res = {
        send: jest.fn(),
        json: function (er) {
          expect(err.name).toBe(er.type);
          expect(err.message).toBe(er.message);
        },
        status: function (responseStatus) {
          expect(responseStatus).toBe(err.statusCode);
          // This next line makes it chainable
          return this;
        },
      };
      errorHandler(err, req, res);
    });
  });
});
