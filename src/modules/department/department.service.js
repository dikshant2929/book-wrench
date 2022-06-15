const Base = require("../../service/Base.service");
const Department = require("./department.model");

class DepartmentService extends Base {
  constructor() {
    super();
    this.Model = Department;
  }

  async removeDepartmentAndDependentData(departmentId){
    const result = await this.deleteById(departmentId);
    return result;
  }
}

module.exports = new DepartmentService();
