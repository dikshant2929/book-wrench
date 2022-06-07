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
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: USER,
    },
    departmentId : {
      type: mongoose.Schema.ObjectId,
      ref: DEPARTMENT,
    },
    subCategory : {
      type: [String],
    }
  },
  {
    timestamps: true,
  }
);

categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

const Category = new mongoose.model(CATEGORY, categorySchema);
module.exports = Category;
