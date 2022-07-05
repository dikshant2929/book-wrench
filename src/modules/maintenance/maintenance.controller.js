const httpStatus = require("http-status");
const Maintenance = require("./maintenance.service");
const catchAsync = require("../../utils/catchAsync");

class MaintenanceController {
  constructor() {
    this.retrieve = catchAsync(this.get.bind(this));
    this.update = catchAsync(this.put.bind(this));
    this.create = catchAsync(this.post.bind(this));
    this.remove = catchAsync(this.delete);
  }

  async get(req, res) {
    const query = req.query || {}
    const result = await Maintenance.getAllByFilter(query, { createdAt: 1 });
    res.status(httpStatus.OK).json(result);
  }

  async post(req, res) {
    const request = req.body || {};
    const maintenance = await Maintenance.insert(request);
    res.status(maintenance ? httpStatus.CREATED : httpStatus.BAD_REQUEST).json(maintenance);
  }

  async put(req, res) {
    let maintenance = null;
    if (req.params && req.params.maintenanceId && req.body) {
      maintenance = await Maintenance.updateById(req.params.maintenanceId, req.body);
    }
    res.status(maintenance ? httpStatus.OK : httpStatus.BAD_REQUEST).json(maintenance);
  }

  async delete(req, res) {
    let result = null;
    if (req.params && req.params.maintenanceId) result = await Maintenance.removeMaintenanceAndDependentData(req.params.maintenanceId);
    res.status(result ? httpStatus.OK : httpStatus.BAD_REQUEST).json(result);
  }
}

module.exports = new MaintenanceController();
