const httpStatus = require("http-status");
const Product = require("./product.service");
const catchAsync = require("../../utils/catchAsync");

class ProductController {
  constructor() {
    this.retrieve = catchAsync(this.get.bind(this));
    this.update = catchAsync(this.put.bind(this));
    this.create = catchAsync(this.post.bind(this));
    this.remove = catchAsync(this.delete);
  }

  async get(req, res) {
    const query = req.query || {}
    const result = await Product.getAllByFilter(query, { createdAt: 1 });
    res.status(httpStatus.OK).json(result);
  }

  async post(req, res) {
    const request = req.body || {};
    request.createdBy = req?.user?.userId;
    const product = await Product.insert(request);
    res.status(product ? httpStatus.CREATED : httpStatus.BAD_REQUEST).json(product);
  }

  async put(req, res) {
    let product = null;
    if (req.params && req.params.productId && req.body) {
      product = await Product.updateById(req.params.productId, req.body);
    }
    res.status(product ? httpStatus.OK : httpStatus.BAD_REQUEST).json(product);
  }

  async delete(req, res) {
    let result = null;
    if (req.params && req.params.productId) result = await Product.removeProductAndDependentData(req.params.productId);
    res.status(result ? httpStatus.OK : httpStatus.BAD_REQUEST).json(result);
  }
}

module.exports = new ProductController();
