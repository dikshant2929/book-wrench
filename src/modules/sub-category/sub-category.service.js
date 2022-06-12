const Base = require("../../service/Base.service");
const SubCategory = require("./sub-category.model");

const httpStatus = require("http-status");
const mongoose = require("mongoose");

const CustomError = require("../../utils/CustomError");
const errorMsgs = require("../../constants/errorMsgs");

const ObjectId = mongoose.Types.ObjectId;

class CategoryService extends Base {
  constructor() {
    super();
    this.Model = SubCategory;
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

  async getSubCategories(filter = {}, sortPref = { createdAt: -1 }) {
    // if (!Object.keys(filter).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.FIND_FILTER_MISSING);
    // console.log(filter);
    let result = await this.getAllByFilter(filter, sortPref)
    result = result && Array.isArray(result) && result.map(item => {
      const categoryItem = item.toJSON();
      categoryItem.numberOfServices = 0;
      categoryItem.numberOfProducts = 0;  
      return categoryItem;
    }) || [];

    return result;
  }

}

module.exports = new CategoryService();
