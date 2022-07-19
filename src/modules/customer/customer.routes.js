const express = require("express");
const router = new express.Router();

const CustomerController = require("./customer.controller");
const validate = require("../../middlewares/validate");

const schema = require("./customer.validation");

router
  .route("/:customerId/contact-person/:contactAddresscontactPersonId?")
  .put(validate(schema.getCustomerValidation), validate(schema.updateContactPersonValidation), CustomerController.updateContactPerson)
  .post(validate(schema.getCustomerValidation), validate(schema.addContactPersonValidation), CustomerController.addContactPerson)
  .delete(validate(schema.getCustomerValidation, {}, {}), CustomerController.deleteContactPerson);

router
  .route("/:customerId/contact-address/:contactAddressId?")
  .put(validate(schema.getCustomerValidation), validate(schema.updateContactAddressValidation), CustomerController.updateContactAddress)
  .post(validate(schema.getCustomerValidation), validate(schema.addContactAddressValidation), CustomerController.addContactAddress)
  .delete(validate(schema.getCustomerValidation, {}, {}), CustomerController.deleteContactAddress);

router
  .route("/:customerId?")
  .get(validate(schema.getCustomerValidation, {}, {}), CustomerController.retrieve)
  .post(validate(schema.addNewCustomerValidation, {}, {}), CustomerController.create)
  .put(validate(schema.updateExistingCustomerValidation, {}, {}), CustomerController.update)
  .delete(validate(schema.getCustomerValidation, {}, {}), CustomerController.remove);


module.exports = router;
