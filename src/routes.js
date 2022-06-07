const express = require("express");
const httpStatus = require("http-status");

const user = require("./modules/user/user.routes");
const category = require("./modules/category/category.routes");
const department = require("./modules/department/department.routes");
const { CANT_PROCESS_REQUEST } = require("./constants/errorMsgs");
const { isValidHeader } = require("./middlewares");

const router = new express.Router();

router.use("/api/v1/user", isValidHeader, user);
router.use("/api/v1/category", isValidHeader, category);
router.use("/api/v1/department", isValidHeader, department);

router.use("/health", (_, res) => {
  return res.status(200).json({ message: "I am healthy" });
});

router.use("*", (_, res) => {
  return res.status(httpStatus.NOT_FOUND).json({ code: httpStatus.NOT_FOUND, message: CANT_PROCESS_REQUEST });
});

module.exports = router;
