const { Joi } = require("express-validation");

const getServiceCommonFieldsForAddEdit = () => ({
  categoryId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for categoryId"),
  subCategoryId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for categoryId"),
  title: Joi.string(),
  description : Joi.string().allow(null, ''),
  warrentyDescription : Joi.string().allow(null, ''),
  icon : Joi.string().allow(null, ''),
  isActive: Joi.boolean(),
  cost : Joi.object({
    costOfService: Joi.string().allow(null, ''),
    costOfMaterial: Joi.string().allow(null, ''),
    commission: Joi.string().allow(null, ''),
    labourMinuites: Joi.number(),
    labourCost: Joi.string().allow(null, ''),
    memberPrice: Joi.string().allow(null, ''),
    addOnPrice: Joi.string().allow(null, ''),
    isTaxable: Joi.boolean().default(false),
    isDiscountable: Joi.boolean().default(false),
  }),
  attachments : Joi.object({
    documents : Joi.array().items(Joi.string()).default([]),
    images : Joi.array().items(Joi.string()).default([]),
    videos : Joi.array().items(Joi.string()).default([]),
  })
});

const addNewServiceValidation = {
  body: Joi.object({
    ...getServiceCommonFieldsForAddEdit(),
    categoryId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for categoryId")
      .required(),
    title: Joi.string().required(),
  }),
};

const updateExistingServiceValidation = {
  body: Joi.object({
    ...getServiceCommonFieldsForAddEdit(),
  }).min(1),
};

const getServiceValidation = {
  params: Joi.object({
    serviceId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
  }),
};

module.exports = {
  addNewServiceValidation,
  updateExistingServiceValidation,
  getServiceValidation
};
