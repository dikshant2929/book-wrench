const httpStatus = require("http-status");
const Vendor = require("./vendor.service");
const catchAsync = require("../../utils/catchAsync");

class VendorController {
  constructor() {
    this.retrieve = catchAsync(this.get.bind(this));
    this.update = catchAsync(this.put.bind(this));
    this.create = catchAsync(this.post.bind(this));
    this.remove = catchAsync(this.delete);
  }

  async get(req, res) {
    const query = req.query || {}
    const result = await Vendor.getAllByFilter(query, { createdAt: 1 });
    res.status(httpStatus.OK).json(result);
  }

  async post(req, res) {
    const request = req.body || {};
    const vendor = await Vendor.insert(request);
    res.status(vendor ? httpStatus.CREATED : httpStatus.BAD_REQUEST).json(vendor);
  }

  async put(req, res) {
    let vendor = null;
    if (req.params && req.params.vendorId && req.body) {
      vendor = await Vendor.updateById(req.params.vendorId, req.body);
    }
    res.status(vendor ? httpStatus.OK : httpStatus.BAD_REQUEST).json(vendor);
  }

  async delete(req, res) {
    let result = null;
    if (req.params && req.params.vendorId) result = await Vendor.removeVendorAndDependentData(req.params.vendorId);
    res.status(result ? httpStatus.OK : httpStatus.BAD_REQUEST).json(result);
  }
}

module.exports = new VendorController();
