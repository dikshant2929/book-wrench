const { Joi } = require("express-validation");

const getUsersCommonFieldsForAddEdit = () => ({
  title: Joi.string(),
  // departmentId: Joi.string()
  //     .hex()
  //     .regex(/^[0-9a-fA-F]{24}$/)
  //     .message("Not a Mongo ID Pattern"),
  categoryId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
  isActive: Joi.boolean().default(true),
  icon: Joi.string(),
  description: Joi.string(),
});

const addNewCateogryValidation = {
  body: Joi.object({
    ...getUsersCommonFieldsForAddEdit(),
    title: Joi.string().required(),
    // departmentId: Joi.string()
    //   .hex()
    //   .regex(/^[0-9a-fA-F]{24}$/)
    //   .message("Not a Mongo ID Pattern")
    //   .required(),
    categoryId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern")
      .required(),
  }).min(3),
};

const updateExistingCategoryValidation = {
  body: Joi.object({
    ...getUsersCommonFieldsForAddEdit(),
  }).min(1),
};

const getCategoryValidation = {
  params: Joi.object({
    subCategoryId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
  }),
};

module.exports = {
  addNewCateogryValidation,
  updateExistingCategoryValidation,
  getCategoryValidation
};
