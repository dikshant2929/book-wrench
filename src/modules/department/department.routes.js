const express = require("express");
const router = new express.Router();

const DepartmentController = require("./department.controller");
const validate = require("../../middlewares/validate");

const schema = require("./department.validation");

router
  .route("/:departmentId?")
  .get(validate(schema.getDepartmentValidation, {}, {}), DepartmentController.retrieve)
  .post(validate(schema.addNewDepartmentValidation, {}, {}), DepartmentController.create)
  .put(validate(schema.updateExistingDepartmentValidation, {}, {}), DepartmentController.update)
  .delete(validate(schema.getDepartmentValidation, {}, {}), DepartmentController.remove);


module.exports = router;
