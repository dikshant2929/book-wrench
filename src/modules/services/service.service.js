const Base = require("../../service/Base.service");
const Model = require("./service.model");

class Service extends Base {
  constructor() {
    super();
    this.Model = Model;
  }

  async removeServiceAndDependentData(serviceId){
    const result = await this.deleteById(serviceId);
    return result;
  }
}

module.exports = new Service();
