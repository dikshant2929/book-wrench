const mongoose = require("mongoose");
const { USER, CATEGORY, DEPARTMENT } = require("../../database/dbCollections");
const { toJSON, paginate } = require("../../utils/plugins");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    icon : {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: USER,
    },
    departmentId : {
      type: mongoose.Schema.ObjectId,
      ref: DEPARTMENT,
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
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);
categorySchema.plugin(require('mongoose-autopopulate'));
// categorySchema.virtual('department', {
//   ref: DEPARTMENT,
//   localField: 'departmentId', 
//   foreignField: '_id' 
// });

const Category = new mongoose.model(CATEGORY, categorySchema);
module.exports = Category;
