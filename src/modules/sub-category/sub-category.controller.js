const httpStatus = require("http-status");
const SubCategory = require("./sub-category.service");
const catchAsync = require("../../utils/catchAsync");

class SubCategoryController {
  constructor() {
    this.retrieve = catchAsync(this.get.bind(this));
    this.update = catchAsync(this.put.bind(this));
    this.create = catchAsync(this.post.bind(this));
    this.remove = catchAsync(this.delete);
  }

  async get(req, res) {
    const query = req.query || {}
    const result = await SubCategory.getSubCategories(query, { createdAt: 1 });
    res.status(result ? httpStatus.OK : httpStatus.NO_CONTENT).json(result);
  }

  async post(req, res) {
    const request = req.body || {};
    request.createdBy = req?.user?.userId;
    const result = await SubCategory.insert(request);
    res.status(result ? httpStatus.CREATED : httpStatus.BAD_REQUEST).json(result);
  }

  async put(req, res) {
    let result = null;
    if (req.params && req.params.subCategoryId && req.body) {
      result = await SubCategory.updateById(req.params.subCategoryId, req.body);
    }
    res.status(result ? httpStatus.OK : httpStatus.BAD_REQUEST).json(result);
  }

  async delete(req, res) {
    let result = null;
    if (req.params && req.params.subCategoryId) result = await SubCategory.deleteById(req.params.subCategoryId);
    res.status(result ? httpStatus.OK : httpStatus.BAD_REQUEST).json(result);
  }
  // async post(req, res) {
  //   const categoryId = req.params.categoryId;
  //   const request = req.body || {};
  //   const subCategory = [request.title];
  //   const category = await SubCategory.addSubCategory(categoryId, { subCategory });
  //   res.status(category ? httpStatus.CREATED : httpStatus.BAD_REQUEST).json(category);
  // }

  // async put(req, res) {
  //   let category = null;
  //   if (req.params && req.params.categoryId && req.body) {
  //     const exisitingCategory = await SubCategory.getById(req.params.categoryId);
  //     const existingSubCategory = exisitingCategory.subCategory || [];
  //     const isPreviousExist = existingSubCategory.some(field => (field === req.body.previousTitle));
  //     if (isPreviousExist) {
  //       const uniqueFields = [...new Set(existingSubCategory.concat(req.body.title))];
  //       exisitingCategory.subCategory = uniqueFields.filter(field => (field !== req.body.previousTitle));
  //       category = await SubCategory.updateById(req.params.categoryId, exisitingCategory);
  //     }
  //   }
  //   res.status(category ? httpStatus.OK : httpStatus.BAD_REQUEST).json(category || { message: "No Previous record found" });
  // }

  // async delete(req, res) {
  //   let result = null;
  //   if (req.params && req.params.categoryId) {
  //     // result = await SubCategory.deleteById(req.params.categoryId);
  //     const exisitingCategory = await SubCategory.getById(req.params.categoryId);
  //     const existingSubCategory = exisitingCategory.subCategory || [];
  //     const isPreviousExist = existingSubCategory.some(field => (field === req.body.title));
  //     if (isPreviousExist) {
  //       const uniqueFields = [...new Set(existingSubCategory)];
  //       exisitingCategory.subCategory = uniqueFields.filter(field => (field !== req.body.title));
  //       result = await SubCategory.updateById(req.params.categoryId, exisitingCategory);
  //     }
  //   }
  //   res.status(result ? httpStatus.OK : httpStatus.BAD_REQUEST).json(result || { message: "No Previous record found" });
  // }
}

module.exports = new SubCategoryController();
