const express = require("express");
const router = new express.Router();

const CustomerMaintenanceController = require("./customer-maintenance.controller");
const validate = require("../../middlewares/validate");

const schema = require("./customer-maintenance.validation");

router
  .route("/:customerMaintenanceId?")
  .get(validate(schema.getCustomerMaintenanceValidation, {}, {}), CustomerMaintenanceController.retrieve)
  .post(validate(schema.addNewCustomerMaintenanceValidation, {}, {}), CustomerMaintenanceController.create)
  .put(validate(schema.updateExistingCustomerMaintenanceValidation, {}, {}), CustomerMaintenanceController.update)
  .delete(validate(schema.getCustomerMaintenanceValidation, {}, {}), CustomerMaintenanceController.remove);


module.exports = router;
