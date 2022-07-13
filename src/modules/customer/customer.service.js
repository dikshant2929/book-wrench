const Base = require("../../service/Base.service");
const Customer = require("./customer.model");

class CustomerService extends Base {
  constructor() {
    super();
    this.Model = Customer;
  }

}

module.exports = new CustomerService();
