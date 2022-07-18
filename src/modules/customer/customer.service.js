const Base = require("../../service/Base.service");
const Customer = require("./customer.model");

const httpStatus = require("http-status");

const errorMsgs = require("../../constants/errorMsgs");
const CustomError = require("../../utils/CustomError");

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
class CustomerService extends Base {
  constructor() {
    super();
    this.Model = Customer;
  }


  async addContactPerson(id, body = {}) {
    if (!Object.keys(body).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.UPDATE_BODY_EMPTY);
    const exisiting = await this.getById(id);
    if (!exisiting) throw new CustomError(httpStatus.NOT_FOUND, errorMsgs.NON_EXISTING);
    const result = await this.Model.findOneAndUpdate({ _id : ObjectId(id) }, { $addToSet: body }, { returnDocument: "after" });
    return result;
  }

  async updateContactPerson(id, contactPersonId, body = {}) {
    if (!Object.keys(body).length) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.UPDATE_BODY_EMPTY);
    const exisiting = await this.getById(id);
    if (!exisiting) throw new CustomError(httpStatus.NOT_FOUND, errorMsgs.NON_EXISTING);
    const result = await this.Model.findOneAndUpdate({ _id : ObjectId(id), "contactPerson._id" : ObjectId(contactPersonId) }, { $set: this.updateObject(body) }, { returnDocument: "after" });
    return result;
  }

  updateObject(object){
    const request = {};
    Object.keys(object['contactPerson']).forEach(item => {
      request['contactPerson.$.'+item] = object['contactPerson'][item];
    });
    console.log(request);
    return request
  }

}

module.exports = new CustomerService();
