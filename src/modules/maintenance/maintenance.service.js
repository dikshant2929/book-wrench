const Base = require("../../service/Base.service");
const Model = require("./maintenance.model");

class MaintenanceService extends Base {
  constructor() {
    super();
    this.Model = Model;
  }

  async removeMaintenanceAndDependentData(serviceId){
    const result = await this.deleteById(serviceId);
    return result;
  }
}

module.exports = new MaintenanceService();
