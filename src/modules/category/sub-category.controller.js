const httpStatus = require("http-status");
const Category = require("./category.service");
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
    let result = await Category.getAllByFilter(query, { createdAt: 1 });
    if(result){
      const data = [];
      result.forEach(categoryItem => {
        categoryItem._doc.subCategory.map(subCategoryItem => {
          data.push({...categoryItem._doc, subCategory : subCategoryItem});
        })
      })
      return res.status(httpStatus.OK).json(data);  
    }
    res.status(httpStatus.OK).json(result);
  }

  async post(req, res) {
    const categoryId = req.params.categoryId;
    const request = req.body || {};
    const subCategory = [request.title];
    const category = await Category.addSubCategory(categoryId, { subCategory });
    res.status(category ? httpStatus.CREATED : httpStatus.BAD_REQUEST).json(category);
  }

  async put(req, res) {
    let category = null;
    if (req.params && req.params.categoryId && req.body) {
      const exisitingCategory = await Category.getById(req.params.categoryId);
      const existingSubCategory = exisitingCategory.subCategory || [];
      const isPreviousExist = existingSubCategory.some(field => (field === req.body.previousTitle));
      if (isPreviousExist) {
        const uniqueFields = [...new Set(existingSubCategory.concat(req.body.title))];
        exisitingCategory.subCategory = uniqueFields.filter(field => (field !== req.body.previousTitle));
        category = await Category.updateById(req.params.categoryId, exisitingCategory);
      }
    }
    res.status(category ? httpStatus.OK : httpStatus.BAD_REQUEST).json(category || { message: "No Previous record found" });
  }

  async delete(req, res) {
    let result = null;
    if (req.params && req.params.categoryId) {
      // result = await Category.deleteById(req.params.categoryId);
      const exisitingCategory = await Category.getById(req.params.categoryId);
      const existingSubCategory = exisitingCategory.subCategory || [];
      const isPreviousExist = existingSubCategory.some(field => (field === req.body.title));
      if (isPreviousExist) {
        const uniqueFields = [...new Set(existingSubCategory)];
        exisitingCategory.subCategory = uniqueFields.filter(field => (field !== req.body.title));
        result = await Category.updateById(req.params.categoryId, exisitingCategory);
      }
    }
    res.status(result ? httpStatus.OK : httpStatus.BAD_REQUEST).json(result || { message: "No Previous record found" });
  }
}

module.exports = new SubCategoryController();
