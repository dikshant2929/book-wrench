const mongoose = require("mongoose");
const { USER, DEPARTMENT } = require("../../database/dbCollections");
const { toJSON, paginate } = require("../../utils/plugins");

const CategoryModel = require("../category/category.model");
const SubCategoryModel = require("../sub-category/sub-category.model");

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

departmentSchema.plugin(toJSON);
departmentSchema.plugin(paginate);

departmentSchema.post('findOneAndDelete', function(document, next) {
  CategoryModel.find({ departmentId: document._id }, (error, categories) => {
    if(!error){
      const categoryIds = categories.map(item => item.id)
      CategoryModel.deleteMany({ departmentId: document._id }, function(err, response) {
        console.log(err, response);
      });
      SubCategoryModel.deleteMany({ categoryId : categoryIds}, function(err, response){
        console.log(err, response);
      })
    }
  })
  next();
});

const Department = new mongoose.model(DEPARTMENT, departmentSchema);
module.exports = Department;
