const httpStatus = require("http-status");
const Customer = require("./customer.service");
const catchAsync = require("../../utils/catchAsync");

class CustomerController {
  constructor() {
    this.retrieve = catchAsync(this.get.bind(this));
    this.update = catchAsync(this.put.bind(this));
    this.create = catchAsync(this.post.bind(this));
    this.remove = catchAsync(this.delete);
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
}

module.exports = new CustomerController();
