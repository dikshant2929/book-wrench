const express = require("express");
const httpStatus = require("http-status");

const multer  = require('multer');
const upload = multer({ dest: 'static/uploads/' });

const user = require("./modules/user/user.routes");
const category = require("./modules/category/category.routes");
const subCategory = require("./modules/sub-category/sub-category.routes");
const department = require("./modules/department/department.routes");
const vendor = require("./modules/vendor/vendor.routes");
const service = require("./modules/services/service.routes");
const product = require("./modules/products/product.routes");

const { CANT_PROCESS_REQUEST } = require("./constants/errorMsgs");
const { isValidHeader } = require("./middlewares");
const ImageController = require("./modules/uploadImage/ImageUpload.controller");

const router = new express.Router();

router.use("/api/v1/user", isValidHeader, user);

router.use("/api/v1/department", isValidHeader, department);
router.use("/api/v1/category", isValidHeader, category);
router.use("/api/v1/sub-category", isValidHeader, subCategory);
router.use("/api/v1/vendor", isValidHeader, vendor);
router.use("/api/v1/service", isValidHeader, service);
router.use("/api/v1/product", isValidHeader, product);


router.post("/api/v1/uploadImage", upload.single('file'), ImageController.uploadImage);
router.delete("/api/v1/deleteImage/:id", ImageController.deleteImage);
router.delete("/api/v1/deleteImageByName/:name", ImageController.deleteImageByName);

router.use("/health", (_, res) => {
  return res.status(200).json({ message: "I am healthy" });
});

router.use("*", (_, res) => {
  return res.status(httpStatus.NOT_FOUND).json({ code: httpStatus.NOT_FOUND, message: CANT_PROCESS_REQUEST });
});

module.exports = router;
