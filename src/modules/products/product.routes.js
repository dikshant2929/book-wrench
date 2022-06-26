const express = require("express");
const router = new express.Router();

const ProductController = require("./product.controller");
const validate = require("../../middlewares/validate");

const schema = require("./product.validation");

router
  .route("/:productId?")
  .get(validate(schema.getProductValidation, {}, {}), ProductController.retrieve)
  .post(validate(schema.addNewProductValidation, {}, {}), ProductController.create)
  .put(validate(schema.updateExistingProductValidation, {}, {}), ProductController.update)
  .delete(validate(schema.getProductValidation, {}, {}), ProductController.remove);


module.exports = router;
