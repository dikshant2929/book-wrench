const express = require("express");
const router = new express.Router();

const CategoryController = require("./category.controller");
const validate = require("../../middlewares/validate");

const schema = require("./category.validation");


// router.get("/sub-category",validate(schema.getCategoryValidation, {}, {}), SubCategoryController.retrieve)

// router
//   .route("/:categoryId/sub-category/:subCategoryId?")
//   .get(validate(schema.getCategoryValidation, {}, {}), SubCategoryController.retrieve)
//   .post(SubCategoryController.create)
//   .put(validate(schema.updateNewSubCateogryValidation, {}, {}), SubCategoryController.update)
//   .delete(validate(schema.removeSubCateogryValidation, {}, {}), SubCategoryController.remove);

router
  .route("/:categoryId?")
  .get(validate(schema.getCategoryValidation, {}, {}), CategoryController.retrieve)
  .post(validate(schema.addNewCateogryValidation, {}, {}), CategoryController.create)
  .put(validate(schema.updateExistingCategoryValidation, {}, {}), CategoryController.update)
  .delete(validate(schema.getCategoryValidation, {}, {}), CategoryController.remove);


module.exports = router;
