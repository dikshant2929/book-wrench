const mongoose = require("mongoose");
const { USER, CATEGORY, DEPARTMENT, SUB_CATEGORY } = require("../../database/dbCollections");
const { toJSON, paginate } = require("../../utils/plugins");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: USER,
      autopopulate: true
    },
    categoryId : {
      type: mongoose.Schema.ObjectId,
      ref: CATEGORY,
      autopopulate: true
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
    }
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);
categorySchema.plugin(require('mongoose-autopopulate'));

const Category = new mongoose.model(SUB_CATEGORY, categorySchema);
module.exports = Category;
