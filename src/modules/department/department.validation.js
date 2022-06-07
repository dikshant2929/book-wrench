const { Joi } = require("express-validation");

const getDepartmentCommonFieldsForAddEdit = () => ({
  title: Joi.string(),
});

const addNewDepartmentValidation = {
  body: Joi.object({
    ...getDepartmentCommonFieldsForAddEdit()
  }),
};

const updateExistingDepartmentValidation = {
  body: Joi.object({
    ...getDepartmentCommonFieldsForAddEdit(),
  }).min(1),
};

const getDepartmentValidation = {
  params: Joi.object({
    departmentId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
  }),
};

module.exports = {
  addNewDepartmentValidation,
  updateExistingDepartmentValidation,
  getDepartmentValidation
};
