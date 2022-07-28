const mongoose = require("mongoose");
const { USER, CUSTOMER, MAINTENANCE, CUSTOMER_MAINTENANCE } = require("../../database/dbCollections");
const { toJSON, paginate } = require("../../utils/plugins");

const customerMaintenanceSchema = new mongoose.Schema(
  {
    maintenance : { 
      type: mongoose.Schema.ObjectId,
      ref: MAINTENANCE,
      autopopulate: true
    },
    description : String, 
    vistFrequency: Object,
    customer : { 
      type: mongoose.Schema.ObjectId,
      ref: CUSTOMER,
      autopopulate: true
    },
    address : { 
      type: mongoose.Schema.ObjectId,
      // ref: CUSTOMER + ".contactAddress",
      autopopulate: true
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
  },
  {
    timestamps: true,
  }
);

customerMaintenanceSchema.plugin(toJSON);
customerMaintenanceSchema.plugin(paginate);
customerMaintenanceSchema.plugin(require('mongoose-autopopulate'));


const Customer = new mongoose.model(CUSTOMER_MAINTENANCE, customerMaintenanceSchema);
module.exports = Customer;
