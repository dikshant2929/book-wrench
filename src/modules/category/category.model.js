const mongoose = require("mongoose");
const { USER, CATEGORY } = require("../../database/dbCollections");
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
