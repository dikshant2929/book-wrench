const { Joi } = require("express-validation");

const getVendorCommonFieldsForAddEdit = () => ({
  title: Joi.string(),
  isActive: Joi.boolean(),
  description : Joi.string().allow(null, '')
});

const addNewVendorValidation = {
  body: Joi.object({
    ...getVendorCommonFieldsForAddEdit()
  }),
};

const updateExistingVendorValidation = {
  body: Joi.object({
    ...getVendorCommonFieldsForAddEdit(),
  }).min(1),
};

const getVendorValidation = {
  params: Joi.object({
    vendorId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
  }),
};

module.exports = {
  addNewVendorValidation,
  updateExistingVendorValidation,
  getVendorValidation
};
