const { Joi } = require("express-validation");

const getProductCommonFieldsForAddEdit = () => ({
  categoryId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for categoryId"),
  subCategoryId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for categoryId"),
  serviceIds : Joi.array().items(
    Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for serviceIds")
  ),
  vendorId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for vendorId"),
  title: Joi.string(),
  code: Joi.string().allow(null, ''),
  brand: Joi.string().allow(null, ''),
  unitOfMessure: Joi.string().allow(null, ''),
  quantity: Joi.number().default(0),
  retailPrice: Joi.number().default(0),
  vendorCost: Joi.number().default(0),
  isActive: Joi.boolean(),
  icon : Joi.string().allow(null, ''),
  description : Joi.string().allow(null, ''),
  warrantyDescription : Joi.string().allow(null, ''),
  attachments : Joi.object({
    documents : Joi.array().items(Joi.string()).default([]),
    images : Joi.array().items(Joi.string()).default([]),
    videos : Joi.array().items(Joi.string()).default([]),
  })
});

const addNewProductValidation = {
  body: Joi.object({
    ...getProductCommonFieldsForAddEdit(),
    categoryId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for categoryId")
      .required(),
    title: Joi.string().required(),
  }),
};

const updateExistingProductValidation = {
  body: Joi.object({
    ...getProductCommonFieldsForAddEdit(),
  }).min(1),
};

const getProductValidation = {
  params: Joi.object({
    productId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
  }),
};

module.exports = {
  addNewProductValidation,
  updateExistingProductValidation,
  getProductValidation
};
