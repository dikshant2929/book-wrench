const { Joi } = require("express-validation");

const getUsersCommonFieldsForAddEdit = () => ({
  name: Joi.string()
    .regex(/^[ A-Za-z ]+$/)
    .not("test")
    .min(3),
  email: Joi.string().email(),
  password: Joi.string(),
  role: Joi.string().default('user'),
  phoneNumber: Joi.string().allow(null, ''),
  profileImage: Joi.string().allow(null, ''),
  lastLogin: Joi.date().timestamp(),
  isActive: Joi.boolean().default(true),
  isVerified: Joi.boolean().default(false),
});

const newUserValidation = {
  body: Joi.object({
    ...getUsersCommonFieldsForAddEdit(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const updateUserValidation = {
  body: Joi.object({
    ...getUsersCommonFieldsForAddEdit(),
  }).min(1),
};

const getUserValidation = {
  query: Joi.object({
    username: Joi.string()
  }),
  params: Joi.object({
    userId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
  }),
};

const loginValidation = {
  body: Joi.object({
    username: Joi.string(),
    password: Joi.string(),
  }),
};


const forgotPasswordValidation = {
  body: Joi.object({
    email: Joi.string().email(),
  }),
};

const verifyForgotPasswordTokenValidation = {
  params: Joi.object({
    token: Joi.string()
  }),
};

module.exports = {
  newUserValidation,
  updateUserValidation,
  getUserValidation,
  loginValidation,
  forgotPasswordValidation,
  verifyForgotPasswordTokenValidation
};
