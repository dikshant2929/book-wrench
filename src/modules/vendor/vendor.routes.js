const express = require("express");
const router = new express.Router();

const VendorController = require("./vendor.controller");
const validate = require("../../middlewares/validate");

const schema = require("./vendor.validation");

router
  .route("/:vendorId?")
  .get(validate(schema.getVendorValidation, {}, {}), VendorController.retrieve)
  .post(validate(schema.addNewVendorValidation, {}, {}), VendorController.create)
  .put(validate(schema.updateExistingVendorValidation, {}, {}), VendorController.update)
  .delete(validate(schema.getVendorValidation, {}, {}), VendorController.remove);


module.exports = router;
