const Base = require("../../service/Base.service");
const Model = require("./product.model");

class ProductService extends Base {
  constructor() {
    super();
    this.Model = Model;
  }

  async removeProductAndDependentData(serviceId){
    const result = await this.deleteById(serviceId);
    return result;
  }
}

module.exports = new ProductService();
