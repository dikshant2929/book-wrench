const express = require("express");
const httpStatus = require("http-status");

const user = require("./modules/user/user.routes");
const { CANT_PROCESS_REQUEST } = require("./constants/errorMsgs");
const { isValidHeader } = require("./middlewares");

const router = new express.Router();

router.use("/api/v1/user", isValidHeader, user);

router.use("/health", (_, res) => {
  return res.status(200).json({ message: "I am healthy" });
});

router.use("*", (_, res) => {
  return res.status(httpStatus.NOT_FOUND).json({ code: httpStatus.NOT_FOUND, message: CANT_PROCESS_REQUEST });
});

module.exports = router;
