const { Joi } = require("express-validation");

const getCustomerCommonFieldsForAddEdit = () => ({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email().allow(null, ''),
  mobileNumber: Joi.string(),
  customerType: Joi.string().allow(null, ''),
  customerCategory: Joi.string().allow(null, ''),
  isActive: Joi.boolean().default(true),
  contactPerson: Joi.array().items(Joi.object({
    name: Joi.string().allow(null, ''),
    mobileNumber: Joi.string().allow(null, ''),
    email: Joi.string().email().allow(null, ''),
    designation: Joi.string().allow(null, ''),
  })),
  contactAddress: Joi.array().items(Joi.object({
    location: Joi.string().allow(null, ''),
    gateNumber: Joi.string().allow(null, ''),
    contactPerson: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
  })),
  profileImage: Joi.string().allow(null, ''),
});

const addNewCustomerValidation = {
  body: Joi.object({
    ...getCustomerCommonFieldsForAddEdit(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    mobileNumber: Joi.string().required(),
  }).min(3),
};

const addContactPersonValidation = {
  body: Joi.object({
    contactPerson: Joi.array().items(Joi.object({
      name: Joi.string().allow(null, ''),
      mobileNumber: Joi.string().allow(null, ''),
      email: Joi.string().email().allow(null, ''),
      designation: Joi.string().allow(null, ''),
    }))
  }).min(1),
};


const updateContactPersonValidation = {
  body: Joi.object({
    contactPerson: Joi.object({
      name: Joi.string().allow(null, ''),
      mobileNumber: Joi.string().allow(null, ''),
      email: Joi.string().email().allow(null, ''),
      designation: Joi.string().allow(null, ''),
    })
  })
};

const addContactAddressValidation = {
  body: Joi.object({
    contactAddress: Joi.array().items(Joi.object({
      location: Joi.string().allow(null, ''),
      gateNumber: Joi.string().allow(null, ''),
      contactPerson: Joi.string()
        .hex()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message("Not a Mongo ID Pattern"),
    }))
  }).min(1),
};

const updateContactAddressValidation = {
  body: Joi.object({
    contactAddress: Joi.object({
      location: Joi.string().allow(null, ''),
      gateNumber: Joi.string().allow(null, ''),
      contactPerson: Joi.string()
        .hex()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message("Not a Mongo ID Pattern"),
    })
  })
};

const updateExistingCustomerValidation = {
  body: Joi.object({
    ...getCustomerCommonFieldsForAddEdit(),
  }).min(1),
};

const getCustomerValidation = {
  params: Joi.object({
    customerId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
    contactPersonId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
    contactAddressId: Joi.string()
      .hex()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Not a Mongo ID Pattern"),
  }),
};



module.exports = {
  addContactAddressValidation,
  updateContactAddressValidation,
  addContactPersonValidation,
  updateContactPersonValidation,
  addNewCustomerValidation,
  updateExistingCustomerValidation,
  getCustomerValidation
};
