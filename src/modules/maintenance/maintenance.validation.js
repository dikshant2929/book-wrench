const { Joi } = require("express-validation");

const getMaintenanceCommonFieldsForAddEdit = () => ({
  categoryId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for categoryId"),
  subCategoryIds: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for categoryId"),
  serviceIds : Joi.array().items(
    Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for serviceIds")
  ),
  productIds : Joi.array().items(
    Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for productIds")
  ),
  title: Joi.string(),
  isActive: Joi.boolean(),
  icon : Joi.string().allow(null, ''),
  description : Joi.string().allow(null, ''),
  packageDescription : Joi.string().allow(null, ''),
  priority : Joi.string().allow(null, ''),
  attachments : Joi.object({
    documents : Joi.array().items(Joi.string()).default([]),
    images : Joi.array().items(Joi.string()).default([]),
    videos : Joi.array().items(Joi.string()).default([]),
  }),
  cost : Joi.object({
    duration: Joi.string().allow(null, ''),
    packageCost: Joi.string().allow(null, ''),
    costPerVisit: Joi.string().allow(null, ''),
    renewalCost: Joi.string().allow(null, ''),
   }),
   expense : Joi.object({
    expense: Joi.string().allow(null, ''),
    additionalCost: Joi.string().allow(null, ''),
    commission: Joi.string().allow(null, ''),
    ticketTimeMinutes: Joi.string().allow(null, ''),
    laborCost: Joi.string().allow(null, ''),
   }),
   frequency : Joi.object({
    interval: Joi.string().allow(null, ''),
    intervalValue: Joi.string().allow(null, ''),
  }),
});

const addNewMaintenanceValidation = {
  body: Joi.object({
    ...getMaintenanceCommonFieldsForAddEdit(),
    categoryId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid format provided for categoryId")
      .required(),
    title: Joi.string().required(),
  }),
};

const updateExistingMaintenanceValidation = {
  body: Joi.object({
    ...getMaintenanceCommonFieldsForAddEdit(),
  }).min(1),
};

const getMaintenanceValidation = {
  params: Joi.object({
    maintenanceId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
  }),
};

module.exports = {
  addNewMaintenanceValidation,
  updateExistingMaintenanceValidation,
  getMaintenanceValidation
};
