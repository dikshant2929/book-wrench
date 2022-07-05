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
    subCategoryId : {
      type: mongoose.Schema.ObjectId,
      ref: SUB_CATEGORY,
      autopopulate: true
    },
    serviceIds : [{
      type: mongoose.Schema.ObjectId,
      ref: SERVICE,
      autopopulate: true
    }],
    title: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
    },
    brand: {
      type: String,
    },
    vendorId : {
      type: mongoose.Schema.ObjectId,
      ref: VENDOR,
      autopopulate: true
    },
    quantity: {
      type: Number,
      default: 0,
    },
    retailPrice: {
      type: Number,
      default: 0,
      get: getPrice, 
      set: setPrice
    },
    vendorCost: {
      type: Number,
      default: 0,
    },
    unitOfMessure : {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    icon : {
      type: String,
      default: "",
    },
    description : {
      type: String,
      default: "",
    },
    warrantyDescription : {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: USER,
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
