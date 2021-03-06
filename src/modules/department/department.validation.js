const { Joi } = require("express-validation");

const getDepartmentCommonFieldsForAddEdit = () => ({
  title: Joi.string(),
  isActive: Joi.boolean(),
  icon: Joi.string().allow(null, ''),
  description : Joi.string().allow(null, '')
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
