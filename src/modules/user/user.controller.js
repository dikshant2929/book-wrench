const httpStatus = require("http-status");
const User = require("./user.service");
const catchAsync = require("../../utils/catchAsync");
const JWT = require("../../utils/JWT");

class UserController {
  constructor() {
    this.retrieve = catchAsync(this.get.bind(this));
    this.update = catchAsync(this.put.bind(this));
    this.create = catchAsync(this.post.bind(this));
    this.login = catchAsync(this.onLogin.bind(this));
    this.forgotPassword = catchAsync(this.onForgotPassword.bind(this));
    this.verifyPasswordToken = catchAsync(this.onVerifyPasswordToken.bind(this));
  }

  async onLogin(req, res){
    const filter = req.body || {};
    filter.isActive === undefined && (filter.isActive = true);
    filter.isVerified === undefined && (filter.isVerified = true);
    const result = await User.getUserByFilter(filter);
    const response = result ? { message : "Thank You for logging-in at Book Wrench System.", data : result} : { message : "Please check your login credetails."};
    if(result){
      const token = JWT.createToken({ userId: result.id, role : result.role});
      //, secure: true
      res.cookie("Authorization", `Bearer ${token}`, { maxAge: 1000 * 60 * 60 * 24 * 90, httpOnly: true, sameSite: "none" }),
      result && User.updateUserById(result.id, { lastLogin : new Date()});
    }
    res.status(result ? httpStatus.OK : httpStatus.NOT_ACCEPTABLE).json(response);
  }

  async onVerifyPasswordToken(req, res){
    const { token } = req.params;
    const payload = JWT.verifyToken(token);  
    const currentTime = (new Date().getTime() / 1000);
    if(!payload.status || payload?.exp < currentTime){
      const data = {
        message : "Link has expired, Please retry with forgot password process."
      };
      const result = await User.getUserByFilter({forgotPasswordToken : token});
      result && User.removeFieldFromCollection(result.id, { forgotPasswordToken : 1});
      return res.status(httpStatus.NOT_ACCEPTABLE).json(data);
    }
  
    const result = await User.getUserByFilter({forgotPasswordToken : token});
    if(!result){
      const data = {
        message : "Link has expired, Please retry with forgot password process."
      };
      return res.status(httpStatus.NOT_ACCEPTABLE).json(data);
    }

    const data = {
      message : "Token Verified"
    }
    res.status(httpStatus.OK).json(data);
  }

  async onForgotPassword(req, res){
    const filter = req.body;
    const result = await User.getUserByFilter(filter);
    if(!result){
      const data = {
        message : "User doesn't exists, please check your email id."
      };
      return res.status(httpStatus.NOT_ACCEPTABLE).json(data);
    }
    const forgotPasswordToken = JWT.createToken({ userId: result.id}, "300s");
    const data = {
      message : "Forgot password link has been sent to your email address successfully"
    }
    data && User.updateUserById(result.id, { forgotPasswordToken });
    res.status(httpStatus.OK).json(data);
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
