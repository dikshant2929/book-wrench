const Base = require("../../service/Base.service");
const Vendor = require("./vendor.model");

class VendorService extends Base {
  constructor() {
    super();
    this.Model = Vendor;
  }

  async removeVendorAndDependentData(vendorId){
    const result = await this.deleteById(vendorId);
    return result;
  }
}

module.exports = new VendorService();
