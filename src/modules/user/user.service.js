const httpStatus = require("http-status");
const mongoose = require("mongoose");

const User = require("./user.model");
const CustomError = require("../../utils/CustomError");
const errorMsgs = require("../../constants/errorMsgs");
const ObjectId = mongoose.Types.ObjectId;

class UserService {
  async createUser(userBody = {}) {
    if (!Object.keys(userBody).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.BODY_EMPTY);

    //Todo: replace mobile to MobileNo with encrypt function once we have all records exists with mobileNo
    const queryToCheckExisting = { username: userBody.username };
    const existingUser = await this.getUserByFilter(queryToCheckExisting);
    if (existingUser) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.USER_EXISTS);
    const result = await User.create(userBody);
    if (result) return result;
    return null;
  }

  async getUserById(id, query = {}) {
    if (!id) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.ID_MISSING);
    return await User.findOne({ _id: ObjectId(id), ...query });
  }

  async getUserByFilter(filter = {}) {
    if (!Object.keys(filter).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.FIND_FILTER_MISSING);
    return await User.findOne(filter);
  }

  async removeFieldFromCollection(userId, filter = {}) {
    if (!Object.keys(filter).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.FIND_FILTER_MISSING);
    return await User.update({ _id: ObjectId(userId) }, {$unset: filter});
  }

  async updateUserById(userId, updateBody = {}) {
    if (!userId) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.ID_MISSING);
    if (!Object.keys(updateBody).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.UPDATE_BODY_EMPTY);
    const user = await this.getUserById(userId);
    if (!user) throw new CustomError(httpStatus.NOT_FOUND, errorMsgs.USER_NOT_FOUND);

    // const timestamp = Date.now();
    // updateBody.lastLogin = timestamp;
    const result = await User.findOneAndUpdate({ _id: ObjectId(userId) }, { $set: updateBody }, { returnDocument: "after" });
    return result;
  }


  async updateUserByFilter(filter = {}, updateBody = {}) {
    if (!Object.keys(filter).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.UPDATE_FILTER_MISSING);
    if (!Object.keys(updateBody).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.UPDATE_BODY_EMPTY);
    const user = await this.getUserByFilter(filter);
    if (!user) throw new CustomError(httpStatus.NOT_FOUND, errorMsgs.USER_NOT_FOUND);
    // const timestamp = Date.now();
    // updateBody.source = updateBody.source || "myaccount";
    // updateBody.lastLogin = timestamp;
    const result = await User.findOneAndUpdate({ ...filter }, { $set: updateBody }, { returnDocument: "after" });
    return result;
  }
}

module.exports = new UserService();
