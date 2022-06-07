const Base = require("../../service/Base.service");
const Category = require("./category.model");

const httpStatus = require("http-status");
const mongoose = require("mongoose");

const CustomError = require("../../utils/CustomError");
const errorMsgs = require("../../constants/errorMsgs");

const ObjectId = mongoose.Types.ObjectId;

class CategoryService extends Base {
  constructor() {
    super();
    this.Model = Category;
  }

  async addSubCategory(id, body = {}) {
    if (!id) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.ID_MISSING);
    if (!Object.keys(body).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.UPDATE_BODY_EMPTY);
    const exisiting = await this.getById(id);
    if (!exisiting) throw new CustomError(httpStatus.NOT_FOUND, errorMsgs.NON_EXISTING);
    if (this.unique_field in body) await this.checkDuplicateData(body);
    const result = await this.Model.findOneAndUpdate({ _id: ObjectId(id) }, { $addToSet: body }, { returnDocument: "after" });
    return result;
  }

  async getCategories(filter = {}) {
    // if (!Object.keys(filter).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.FIND_FILTER_MISSING);
    // console.log(filter);
    return this.Model.find(filter).populate("departmentId");
  }

}

module.exports = new CategoryService();
