const express = require("express");
const router = new express.Router();

const UserController = require("./user.controller");
const validate = require("../../middlewares/validate");

const schema = require("./user.validation");

router.post('/login', validate(schema.loginValidation), UserController.login);
router.post('/forgot-password', validate(schema.forgotPasswordValidation), UserController.forgotPassword);
router.get('/verify-forgot-password-token/:token', validate(schema.verifyForgotPasswordTokenValidation), UserController.verifyPasswordToken);
router.post('/login', validate(schema.loginValidation), UserController.login);

router
  .route("/:userId?")
  .get(validate(schema.getUserValidation, {}, {}), UserController.retrieve)
  .post(validate(schema.newUserValidation, {}, {}), UserController.create)
  .put(validate(schema.updateUserValidation, {}, {}), UserController.update);


module.exports = router;
