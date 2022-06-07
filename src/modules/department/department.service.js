const Base = require("../../service/Base.service");
const Department = require("./department.model");

class DepartmentService extends Base {
  constructor() {
    super();
    this.Model = Department;
  }
}

module.exports = new DepartmentService();
