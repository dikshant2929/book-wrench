const mongoose = require("mongoose");
const { USER, CATEGORY, SUB_CATEGORY ,SERVICE, PRODUCT, VENDOR,MAINTENANCE } = require("../../database/dbCollections");
const { toJSON, paginate } = require("../../utils/plugins");

const maintenanceSchema = new mongoose.Schema(
  {
    categoryId : {
      type: mongoose.Schema.ObjectId,
      ref: CATEGORY,
      autopopulate: true,
      required: true
    },
    subCategoryIds : [{
      type: mongoose.Schema.ObjectId,
      ref: SUB_CATEGORY,
      autopopulate: true
    }],
    servicesIds : [{
      type: mongoose.Schema.ObjectId,
      ref: SERVICE,
      autopopulate: true
    }],
    productsIds : [{
      type: mongoose.Schema.ObjectId,
      ref: PRODUCT,
      autopopulate: true
    }],
    cost : {
      duration : String,
      packageCost: String,
      costPerVisit : String,
      renewalCost: String, 
    },
    expense : {
      expense : String,
      additionalCost: String,
      commission : String,
      ticketTimeMinutes: String, 
      laborCost: String, 
    },
    frequency : {
      interval : String,
      intervalValue: String,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    icon : {
      type: String,
      default: "",
    },
    priority : {
      type: String,
      default: "",
    },
    packageDescription : {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: USER,
      autopopulate: true,
    },
    attachments : {
      documents : [ String ],
      images : [ String ],
      videos : [ String ],
    }
  },
  {
    timestamps: true,
  }
);

function getPrice(num){
  // return (num/100).toFixed(2);
  return num;
}

function setPrice(num){
  // return num*100;
  return num;
}

maintenanceSchema.plugin(toJSON);
maintenanceSchema.plugin(paginate);
maintenanceSchema.plugin(require('mongoose-autopopulate'));

const maintenanceModel = new mongoose.model(MAINTENANCE, maintenanceSchema);
module.exports = maintenanceModel;
