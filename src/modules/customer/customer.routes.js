const express = require("express");
const router = new express.Router();

const CustomerController = require("./customer.controller");
const validate = require("../../middlewares/validate");

const schema = require("./customer.validation");

router
  .route("/:customerId?")
  .get(validate(schema.getCustomerValidation, {}, {}), CustomerController.retrieve)
  .post(validate(schema.addNewCustomerValidation, {}, {}), CustomerController.create)
  .put(validate(schema.updateExistingCustomerValidation, {}, {}), CustomerController.update)
  .delete(validate(schema.getCustomerValidation, {}, {}), CustomerController.remove);


module.exports = router;