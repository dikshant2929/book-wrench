const { Joi } = require("express-validation");

const getUsersCommonFieldsForAddEdit = () => ({
  title: Joi.string(),
  departmentId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
});

const addNewCateogryValidation = {
  body: Joi.object({
    ...getUsersCommonFieldsForAddEdit(),
    departmentId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern")
      .required(),
  }).min(1),
};

const updateExistingCategoryValidation = {
  body: Joi.object({
    ...getUsersCommonFieldsForAddEdit(),
  }).min(1),
};

const getCategoryValidation = {
  params: Joi.object({
    categoryId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
  }),
};

const updateNewSubCateogryValidation = {
  body: Joi.object({
    previousTitle: Joi.string().required(),
    title: Joi.string().required(),
  }),
};

const removeSubCateogryValidation = {
  body: Joi.object({
    title: Joi.string().required(),
  }),
};
module.exports = {
  addNewCateogryValidation,
  updateExistingCategoryValidation,
  getCategoryValidation,
  updateNewSubCateogryValidation,
  removeSubCateogryValidation
};
