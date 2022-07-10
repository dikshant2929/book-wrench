const httpStatus = require("http-status");
const Category = require("./category.service");
const catchAsync = require("../../utils/catchAsync");

class CategoryController {
  constructor() {
    this.retrieve = catchAsync(this.get.bind(this));
    this.update = catchAsync(this.put.bind(this));
    this.create = catchAsync(this.post.bind(this));
    this.remove = catchAsync(this.delete);
  }

  async get(req, res) {
    const query = req.query || {}
    const result = await Category.getCategories(query, { createdAt: 1 });
    res.status(httpStatus.OK).json(result);
  }

  async post(req, res) {
    const request = req.body || {};
    request.createdBy = req?.user?.userId;
    const category = await Category.insert(request);
    res.status(category ? httpStatus.CREATED : httpStatus.BAD_REQUEST).json(category);
  }

  async put(req, res) {
    let category = null;
    if (req.params && req.params.categoryId && req.body) {
      category = await Category.updateById(req.params.categoryId, req.body);
    }
    res.status(category ? httpStatus.OK : httpStatus.BAD_REQUEST).json(category);
  }

  async delete(req, res) {
    let result = null;
    if (req.params && req.params.categoryId) result = await Category.deleteById(req.params.categoryId);
    res.status(result ? httpStatus.OK : httpStatus.BAD_REQUEST).json(result);
  }
}

module.exports = new CategoryController();
