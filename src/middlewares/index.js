const JWT = require("../utils/JWT");

const isValidHeader = (req, _, next) => {
  const authorization = req.cookies?.["Authorization"]  || req.headers?.authorization;;
  if (authorization) {
    const { status, payload } = JWT.verifyToken(authorization.replace("Bearer ", ""));
    if (status && payload) {
      req.user = payload;
      next();
    }else{
      next(new Error("Invalid token"));
    }
  }else{
    next(new Error("Authorization token is missing"));
  }
  // const secret = req.headers["Authorization"] || null;
  // if (!secret) {
  //   next(new Error("secret key is missing in headers"));
  // } else if (!ProjectStorage.isValid(secret)) {
  //   next(new Error("Invalid secret key"));
  // } else {
  //   next();
  // }
};

module.exports.validate = require("./validate");
module.exports.isValidHeader = isValidHeader;
