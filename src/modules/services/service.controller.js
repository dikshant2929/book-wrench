const httpStatus = require("http-status");
const Service = require("./service.service");
const catchAsync = require("../../utils/catchAsync");

class ServiceController {
  constructor() {
    this.retrieve = catchAsync(this.get.bind(this));
    this.update = catchAsync(this.put.bind(this));
    this.create = catchAsync(this.post.bind(this));
    this.remove = catchAsync(this.delete);
  }

  async get(req, res) {
    const query = req.query || {}
    const result = await Service.getAllByFilter(query, { createdAt: 1 });
    res.status(httpStatus.OK).json(result);
  }

  async post(req, res) {
    const request = req.body || {};
    const service = await Service.insert(request);
    res.status(service ? httpStatus.CREATED : httpStatus.BAD_REQUEST).json(service);
  }

  async put(req, res) {
    let service = null;
    if (req.params && req.params.serviceId && req.body) {
      service = await Service.updateById(req.params.serviceId, req.body);
    }
    res.status(service ? httpStatus.OK : httpStatus.BAD_REQUEST).json(service);
  }

  async delete(req, res) {
    let result = null;
    if (req.params && req.params.serviceId) result = await Service.removeServiceAndDependentData(req.params.serviceId);
    res.status(result ? httpStatus.OK : httpStatus.BAD_REQUEST).json(result);
  }
}

module.exports = new ServiceController();
