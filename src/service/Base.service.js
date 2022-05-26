const httpStatus = require("http-status");
const mongoose = require("mongoose");

const CustomError = require("../utils/CustomError");
const errorMsgs = require("../constants/errorMsgs");

const ObjectId = mongoose.Types.ObjectId;
class Base {
  /**
   * Get by id
   * @param {ObjectId} id
   * @return {Promise<{}>} document.
   */
  async getById(id) {
    if (!id) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.ID_MISSING);
    return this.Model.findOne({ _id: ObjectId(id) });
  }

  /**
   * Get by filter
   * @param {Object} filter
   * @return {Promise<{}>} document.
   */
  async getByFilter(filter = {}) {
    if (!Object.keys(filter).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.FIND_FILTER_MISSING);
    console.log(filter);
    return this.Model.findOne(filter);
  }

  async getAllByFilter(filter = {}, sortPref = { created: -1 }) {
    if (!Object.keys(filter).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.FIND_FILTER_MISSING);
    return this.Model.find(filter).sort(sortPref);
  }

  async getAllById(id, sortPref = { created: -1 }) {
    if (!id) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.ID_MISSING);
    return this.Model.find({ _id: ObjectId(id) }).sort(sortPref);
  }

  async checkDuplicateData(body) {
    const filter = {};
    filter[this.unique_field] = body[this.unique_field];
    const result = await this.getByFilter(filter);
    if (result) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.DUPLICATE_DATA_FOUND);
  }

  async insert(body = {}) {
    if (!Object.keys(body).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.BODY_EMPTY);
    if (this.unique_field) await this.checkDuplicateData(body);
    const result = await this.Model.create(body);
    if (result) return result;
    return null;
  }

  async updateById(id, body = {}) {
    if (!id) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.ID_MISSING);
    if (!Object.keys(body).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.UPDATE_BODY_EMPTY);
    const exisiting = await this.getById(id);
    if (!exisiting) throw new CustomError(httpStatus.NOT_FOUND, errorMsgs.NON_EXISTING);
    if (this.unique_field in body) await this.checkDuplicateData(body);
    const result = await this.Model.findOneAndUpdate({ _id: ObjectId(id) }, { $set: body }, { returnDocument: "after" });
    return result;
  }

  async updateByFilter(filter = {}, body = {}) {
    if (!Object.keys(filter).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.UPDATE_FILTER_MISSING);
    if (!Object.keys(body).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.UPDATE_BODY_EMPTY);
    const exisiting = await this.getByFilter(filter);
    if (!exisiting) throw new CustomError(httpStatus.NOT_FOUND, errorMsgs.NON_EXISTING);
    const result = await this.Model.findOneAndUpdate({ ...filter }, { $set: body }, { returnDocument: "after" });
    return result;
  }

  async deleteByFilter(filter = {}) {
    if (!Object.keys(filter).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.FIND_FILTER_MISSING);
    const exisiting = await this.getByFilter(filter);
    if (!exisiting) throw new CustomError(httpStatus.NOT_FOUND, errorMsgs.NON_EXISTING);
    const result = await this.Model.findOneAndDelete(filter);
    return result;
  }

  async deleteById(id) {
    if (!id) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.ID_MISSING);
    const exisiting = await this.getById(id);
    if (!exisiting) throw new CustomError(httpStatus.NOT_FOUND, errorMsgs.NON_EXISTING);
    const result = await this.Model.findOneAndDelete({ _id: ObjectId(id) });
    return result;
  }
}

module.exports = Base;
