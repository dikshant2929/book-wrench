const express = require("express");
const router = new express.Router();

const SubCategoryController = require("./sub-category.controller");

const validate = require("../../middlewares/validate");

const schema = require("./sub-category.validation");


// router.get("/sub-category",validate(schema.getCategoryValidation, {}, {}), SubCategoryController.retrieve)

router
  .route("/:subCategoryId?")
  .get(validate(schema.getCategoryValidation, {}, {}), SubCategoryController.retrieve)
  .post(validate(schema.addNewCateogryValidation, {}, {}), SubCategoryController.create)
  .put(validate(schema.updateExistingCategoryValidation, {}, {}), SubCategoryController.update)
  .delete(validate(schema.getCategoryValidation, {}, {}), SubCategoryController.remove);


module.exports = router;
