const mongoose = require("mongoose");
const { USER, VENDOR } = require("../../database/dbCollections");
const { toJSON, paginate } = require("../../utils/plugins");

const vendorSchema = new mongoose.Schema(
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
    isActive: {
      type: Boolean,
      default: true,
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

vendorSchema.plugin(toJSON);
vendorSchema.plugin(paginate);

const Vendor = new mongoose.model(VENDOR, vendorSchema);
module.exports = Vendor;
