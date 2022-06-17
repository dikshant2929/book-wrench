const express = require("express");
const router = new express.Router();

const ServiceController = require("./service.controller");
const validate = require("../../middlewares/validate");

const schema = require("./service.validation");

router
  .route("/:serviceId?")
  .get(validate(schema.getServiceValidation, {}, {}), ServiceController.retrieve)
  .post(validate(schema.addNewServiceValidation, {}, {}), ServiceController.create)
  .put(validate(schema.updateExistingServiceValidation, {}, {}), ServiceController.update)
  .delete(validate(schema.getServiceValidation, {}, {}), ServiceController.remove);


module.exports = router;
