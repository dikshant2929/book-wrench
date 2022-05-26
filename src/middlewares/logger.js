const { logger, getReqDurationInMs } = require("./../utils/global");
const { encrypt } = require("../utils/encryption");

module.exports = (req, res, next) => {
  const { method, url, body } = req;
  const loggerBody = { ...body };
  let loggerURL = url;

  if (url.includes("health")) {
    next();
    return;
  }

  if (loggerBody.mobile) {
    loggerBody.mobile = encrypt(loggerBody.mobile);
  }
  if (loggerBody.email) {
    loggerBody.email = encrypt(loggerBody.email);
  }

  if (loggerURL) {
    let queryParams = loggerURL.split("?")?.[1] || null;
    if (queryParams) {
      queryParams = new URLSearchParams(queryParams);
      if (queryParams.get("mobile")) {
        loggerURL = loggerURL.replace(queryParams.get("mobile"), encrypt(queryParams.get("mobile")));
      }
      if (queryParams.get("email")) {
        loggerURL = loggerURL.replace(queryParams.get("email"), encrypt(queryParams.get("email")));
      }
    }
  }

  const start = process.hrtime();
  const reqBody = new URLSearchParams(loggerBody).toString();

  logger.log({
    level: "info",
    type: "request",
    method: method,
    url: loggerURL,
    body: reqBody,
  });

  /* res.on("finish", () =>
    console.log(
      `[${chalk.green.bold(getCurrentDateTime())}]  [ END ] ${method}:` +
      `${chalk.underline(url)}${method != "GET" ? chalk.underline(reqBody) : ""} ` +
      `${chalk.italic("Status")}:${res.statusCode} ` +
      `${chalk.italic("Duration")}:${getReqDurationInMs(start)}ms`
    )
  ); */
  res.on("close", () =>
    logger.log({
      level: "info",
      code: res.statusCode,
      type: "response",
      method: method,
      url: loggerURL,
      body: reqBody,
      duration: `${getReqDurationInMs(start)}`,
    })
  );
  next();
};
