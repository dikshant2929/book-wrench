const httpStatus = require("http-status");
const Customer = require("./customer.service");
const catchAsync = require("../../utils/catchAsync");

class CustomerController {
  constructor() {
    this.retrieve = catchAsync(this.get.bind(this));
    this.update = catchAsync(this.put.bind(this));
    this.create = catchAsync(this.post.bind(this));
    this.remove = catchAsync(this.delete);
    this.addContactPerson = catchAsync(this.#addContactPerson.bind(this));
    this.updateContactPerson = catchAsync(this.#updateContactPerson.bind(this));
    this.deleteContactPerson = catchAsync(this.#deleteContactPerson.bind(this));
    this.addContactAddress = catchAsync(this.#addContactAddress.bind(this));
    this.updateContactAddress = catchAsync(this.#updateContactAddress.bind(this));
    this.deleteContactAddress = catchAsync(this.#deleteContactAddress.bind(this));
    
  }

  async get(req, res) {
    const query = req.query || {}
    const result = await Customer.getAllByFilter(query, { createdAt: 1 });
    res.status(httpStatus.OK).json(result);
  }

  async post(req, res) {
    const request = req.body || {};
    request.createdBy = req?.user?.userId;
    const customer = await Customer.insert(request);
    res.status(customer ? httpStatus.CREATED : httpStatus.BAD_REQUEST).json(customer);
  }

  async put(req, res) {
    let customer = null;
    if (req.params && req.params.customerId && req.body) {
      customer = await Customer.updateById(req.params.customerId, req.body);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

  async delete(req, res) {
    let result = null;
    if (req.params && req.params.customerId) result = await Customer.deleteById(req.params.customerId);
    res.status(result ? httpStatus.OK : httpStatus.BAD_REQUEST).json(result);
  }

  async #addContactPerson(req , res){
    let customer = null;
    if (req.params && req.params.customerId && req.body) {
      customer = await Customer.addContactPerson(req.params.customerId, req.body);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

  async #updateContactPerson(req , res){
    let customer = null;
    if (req.params && req.params.customerId && req.body && req.params.contactPersonId) {
      customer = await Customer.updateContactPerson(req.params.customerId, req.params.contactPersonId, req.body);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

  async #deleteContactPerson(req , res){
    let customer = null;
    if (req.params && req.params.customerId && req.params.contactPersonId) {
      customer = await Customer.removeContactPerson(req.params.customerId, req.params.contactPersonId);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

  async #addContactAddress(req , res){
    let customer = null;
    if (req.params && req.params.customerId && req.body) {
      customer = await Customer.addContactAddress(req.params.customerId, req.body);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

  async #updateContactAddress(req , res){
    let customer = null;
    if (req.params && req.params.customerId && req.body && req.params.contactAddressId) {
      customer = await Customer.updateContactAddress(req.params.customerId, req.params.contactAddressId, req.body);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

  async #deleteContactAddress(req , res){
    let customer = null;
    if (req.params && req.params.customerId && req.params.contactAddressId) {
      customer = await Customer.removeContactAddress(req.params.customerId, req.params.contactAddressId);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

}

module.exports = new CustomerController();
