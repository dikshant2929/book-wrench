const { Joi } = require("express-validation");

const getCustomerMaintenanceCommonFieldsForAddEdit = () => ({
  maintenance: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Maintenance Id is not correct"),

  description: Joi.string().allow(null, ''),
  vistFrequency: Joi.object(),
  customer: Joi.string()
    .hex()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("Customer Id is not correct"),

  address: Joi.string()
    .hex()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("Address Id is not correct"),
});

const addNewCustomerMaintenanceValidation = {
  body: Joi.object({
    ...getCustomerMaintenanceCommonFieldsForAddEdit(),
    maintenance: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Maintenance Id is not correct")
      .required(),
    vistFrequency: Joi.object().required(),
    customer: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Customer Id is not correct")
      .required(),

    address: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Address Id is not correct")
      .required(),

  }).min(3),
};

const updateExistingCustomerMaintenanceValidation = {
  body: Joi.object({
    ...getCustomerMaintenanceCommonFieldsForAddEdit(),
  }).min(1),
};

const getCustomerMaintenanceValidation = {
  params: Joi.object({
    customerMaintenanceId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
  }),
};



module.exports = {
  addNewCustomerMaintenanceValidation,
  updateExistingCustomerMaintenanceValidation,
  getCustomerMaintenanceValidation
};
