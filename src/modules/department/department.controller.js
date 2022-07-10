const httpStatus = require("http-status");
const Department = require("./department.service");
const catchAsync = require("../../utils/catchAsync");

class DepartmentController {
  constructor() {
    this.retrieve = catchAsync(this.get.bind(this));
    this.update = catchAsync(this.put.bind(this));
    this.create = catchAsync(this.post.bind(this));
    this.remove = catchAsync(this.delete);
  }

  async get(req, res) {
    const query = req.query || {}
    const result = await Department.getAllByFilter(query, { createdAt: 1 });
    res.status(httpStatus.OK).json(result);
  }

  async post(req, res) {
    const request = req.body || {};
    request.createdBy = req?.user?.userId;
    const department = await Department.insert(request);
    res.status(department ? httpStatus.CREATED : httpStatus.BAD_REQUEST).json(department);
  }

  async put(req, res) {
    let department = null;
    if (req.params && req.params.departmentId && req.body) {
      department = await Department.updateById(req.params.departmentId, req.body);
    }
    res.status(department ? httpStatus.OK : httpStatus.BAD_REQUEST).json(department);
  }

  async delete(req, res) {
    let result = null;
    if (req.params && req.params.departmentId) result = await Department.removeDepartmentAndDependentData(req.params.departmentId);
    res.status(result ? httpStatus.OK : httpStatus.BAD_REQUEST).json(result);
  }
}

module.exports = new DepartmentController();
