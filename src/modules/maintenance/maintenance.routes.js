const express = require("express");
const router = new express.Router();

const MaintenanceController = require("./maintenance.controller");
const validate = require("../../middlewares/validate");

const schema = require("./maintenance.validation");

router
  .route("/:maintenanceId?")
  .get(validate(schema.getMaintenanceValidation, {}, {}), MaintenanceController.retrieve)
  .post(validate(schema.addNewMaintenanceValidation, {}, {}), MaintenanceController.create)
  .put(validate(schema.updateExistingMaintenanceValidation, {}, {}), MaintenanceController.update)
  .delete(validate(schema.getMaintenanceValidation, {}, {}), MaintenanceController.remove);


module.exports = router;
