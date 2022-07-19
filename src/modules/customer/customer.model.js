const mongoose = require("mongoose");
const { USER, CUSTOMER } = require("../../database/dbCollections");
const { toJSON, paginate } = require("../../utils/plugins");
const validator = require("validator");

const customerSchema = new mongoose.Schema(
  {
    customerId : { type: Number, default: 1, unique: true },
    profileImage : String, 
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customerType: {
      type: String
    },
    customerCategory: {
      type: String
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: USER,
      autopopulate: true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    contactPerson : [{
      name : String,
      mobileNumber: String, 
      email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
          if (!validator.isEmail(value)) {
            throw new Error("Invalid email");
          }
        },
      },
      designation: String
    }],
    contactAddress : [{
      location: String, 
      gateNumber: String, 
      contactPerson : {
        type : mongoose.Schema.ObjectId,
        autopopulate: true
      }
    }]
  },
  {
    timestamps: true,
  }
);

customerSchema.plugin(toJSON);
customerSchema.plugin(paginate);
customerSchema.plugin(require('mongoose-autopopulate'));

customerSchema.pre("save", async function (next) {
  const lastField = await Customer.findOne({}).sort({createdAt: -1})
  const customer = this;
  customer.customerId = (lastField?.customerId || 0) + 1;
  next();
});

const Customer = new mongoose.model(CUSTOMER, customerSchema);
module.exports = Customer;
