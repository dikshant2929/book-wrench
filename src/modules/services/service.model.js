const mongoose = require("mongoose");
const { USER, CATEGORY, SUB_CATEGORY ,SERVICE } = require("../../database/dbCollections");
const { toJSON, paginate } = require("../../utils/plugins");

const serviceSchema = new mongoose.Schema(
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
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description : {
      type: String,
      default: "",
    },
    warrentyDescription : {
      type: String,
      default: "",
    },
    icon : {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: USER,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    cost : {
      costOfService : String,
      costOfMaterial : String,
      commission: String,
      labourMinuites : Number,
      labourCost: String, 
      memberPrice: String, 
      addOnPrice: String, 
      isTaxable: {
        type: Boolean,
        default: false,
      },
      isDiscountable: {
        type: Boolean,
        default: false,
      },
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

serviceSchema.plugin(toJSON);
serviceSchema.plugin(paginate);

const serviceModel = new mongoose.model(SERVICE, serviceSchema);
module.exports = serviceModel;
