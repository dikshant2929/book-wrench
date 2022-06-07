const mongoose = require("mongoose");
const { USER, DEPARTMENT } = require("../../database/dbCollections");
const { toJSON, paginate } = require("../../utils/plugins");

const departmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: USER,
    }
  },
  {
    timestamps: true,
  }
);

departmentSchema.plugin(toJSON);
departmentSchema.plugin(paginate);

const Department = new mongoose.model(DEPARTMENT, departmentSchema);
module.exports = Department;
