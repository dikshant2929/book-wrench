const express = require("express");
const router = new express.Router();

const UserController = require("./user.controller");
const validate = require("../../middlewares/validate");

const schema = require("./user.validation");
const { isValidHeader } = require("../../middlewares");

router.post('/login', validate(schema.loginValidation), UserController.login);
router.post('/forgot-password', validate(schema.forgotPasswordValidation), UserController.forgotPassword);
router.get('/verify-forgot-password-token/:token', validate(schema.verifyForgotPasswordTokenValidation), UserController.verifyPasswordToken);

router
  .route("/:userId?")
  .get(isValidHeader, validate(schema.getUserValidation, {}, {}), UserController.retrieve)
  .post(isValidHeader, validate(schema.newUserValidation, {}, {}), UserController.create)
  .put(isValidHeader, validate(schema.updateUserValidation, {}, {}), UserController.update);


module.exports = router;
