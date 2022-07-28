const httpStatus = require("http-status");
const CustomerMaintenance = require("./customer-maintenance.service");
const catchAsync = require("../../utils/catchAsync");

class CustomerMaintenanceController {
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
    const result = await CustomerMaintenance.getAllByFilter(query, { createdAt: 1 });
    res.status(httpStatus.OK).json(result);
  }

  async post(req, res) {
    const request = req.body || {};
    request.createdBy = req?.user?.userId;
    const customer = await CustomerMaintenance.insert(request);
    res.status(customer ? httpStatus.CREATED : httpStatus.BAD_REQUEST).json(customer);
  }

  async put(req, res) {
    let customer = null;
    if (req.params && req.params.customerMaintenanceId && req.body) {
      customer = await CustomerMaintenance.updateById(req.params.customerMaintenanceId, req.body);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

  async delete(req, res) {
    let result = null;
    if (req.params && req.params.customerMaintenanceId) result = await CustomerMaintenance.deleteById(req.params.customerMaintenanceId);
    res.status(result ? httpStatus.OK : httpStatus.BAD_REQUEST).json(result);
  }

  async #addContactPerson(req , res){
    let customer = null;
    if (req.params && req.params.customerMaintenanceId && req.body) {
      customer = await CustomerMaintenance.addContactPerson(req.params.customerMaintenanceId, req.body);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

  async #updateContactPerson(req , res){
    let customer = null;
    if (req.params && req.params.customerMaintenanceId && req.body && req.params.contactPersonId) {
      customer = await CustomerMaintenance.updateContactPerson(req.params.customerMaintenanceId, req.params.contactPersonId, req.body);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

  async #deleteContactPerson(req , res){
    let customer = null;
    if (req.params && req.params.customerMaintenanceId && req.params.contactPersonId) {
      customer = await CustomerMaintenance.removeContactPerson(req.params.customerMaintenanceId, req.params.contactPersonId);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

  async #addContactAddress(req , res){
    let customer = null;
    if (req.params && req.params.customerMaintenanceId && req.body) {
      customer = await CustomerMaintenance.addContactAddress(req.params.customerMaintenanceId, req.body);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

  async #updateContactAddress(req , res){
    let customer = null;
    if (req.params && req.params.customerMaintenanceId && req.body && req.params.contactAddressId) {
      customer = await CustomerMaintenance.updateContactAddress(req.params.customerMaintenanceId, req.params.contactAddressId, req.body);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

  async #deleteContactAddress(req , res){
    let customer = null;
    if (req.params && req.params.customerMaintenanceId && req.params.contactAddressId) {
      customer = await CustomerMaintenance.removeContactAddress(req.params.customerMaintenanceId, req.params.contactAddressId);
    }
    res.status(customer ? httpStatus.OK : httpStatus.BAD_REQUEST).json(customer);
  }

}

module.exports = new CustomerMaintenanceController();
