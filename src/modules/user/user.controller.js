const httpStatus = require("http-status");
const User = require("./user.service");
const catchAsync = require("../../utils/catchAsync");

class UserController {
  constructor() {
    this.retrieve = catchAsync(this.get.bind(this));
    this.update = catchAsync(this.put.bind(this));
    this.create = catchAsync(this.post.bind(this));
    this.login = catchAsync(this.onLogin.bind(this));
  }

  async onLogin(req, res){
    const filter = req.body || {};
    filter.isActive === undefined && (filter.isActive = true);
    filter.isVerified === undefined && (filter.isVerified = true);
    const result = await User.getUserByFilter(filter);
    const response = result ? { message : "Thank You for logging-in at Book Wrench System.", data : result} : { message : "Please check your login credetails."};
    res.status(result ? httpStatus.OK : httpStatus.NOT_ACCEPTABLE).json(response);
  }

  async get(req, res) {
    let result = null;
    const filter = req.body || {};
    filter.isActive === undefined && (filter.isActive = true);
    filter.isVerified === undefined && (filter.isVerified = true);
    if (req.params && req.params.userId) {
      result = await User.getUserById(req.params.userId, filter)
    } else if (req.body && req.body.username) {
      result = await User.getUserByFilter(filter);
    }
    res.status(result ? httpStatus.OK : httpStatus.NO_CONTENT).json(result);
  }

  async post(req, res) {
    const request = req.body || {};
    const user = await User.createUser(request);
    res.status(user ? httpStatus.CREATED : httpStatus.BAD_REQUEST).json(user);
  }

  async put(req, res) {
    let user = null;
    if (req.params && req.params.userId) user = await User.updateUserById(req.params.userId, req.body);
    else if (req.query && req.query.mobile) user = await User.updateUserByFilter(req.query, req.body);
    res.status(user ? httpStatus.OK : httpStatus.BAD_REQUEST).json(user);
  }
}

module.exports = new UserController();
