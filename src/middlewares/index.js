const isValidHeader = (req, _, next) => {
  // const secret = req.headers["secret"] || null;
  // if (!secret) {
  //   next(new Error("secret key is missing in headers"));
  // } else if (!ProjectStorage.isValid(secret)) {
  //   next(new Error("Invalid secret key"));
  // } else {
  //   next();
  // }
  next();
};

module.exports.validate = require("./validate");
module.exports.isValidHeader = isValidHeader;
