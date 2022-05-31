const jwt = require("jsonwebtoken");
const { logger } = require("./global");

const PUBLIC_KEY = process.env.RSA_PUB_KEY.replace(/\\n/gm, "\n");
const PRIVATE_KEY = process.env.RSA_PRIV_KEY.replace(/\\n/gm, "\n");

module.exports = {
  createToken: (payload = {}, expiresIn = "90d") => {
    if (!Object.keys(payload).length) return null;
    try {
      return jwt.sign(payload, PRIVATE_KEY, {
        algorithm: "RS256",
        expiresIn,
      });
    } catch (e) {
      logger.log({
        level: "error",
        message: `Token creation error:`,
        e,
      });
      return null;
    }
  },

  verifyToken: (token = "") => {
    if (!token) return { status: false };
    try {
      const result = jwt.verify(token, PUBLIC_KEY);
      result.token = token;
      return { payload: result, status: true };
    } catch (e) {
      logger.log({
        level: "error",
        message: `Token verification error:`,
        e,
      });
      return { status: false };
    }
  },
};
// https://flaviocopes.com/graphql-auth-apollo-jwt-cookies/
// https://dev.to/ahmdtalat/graphql-server-authentication-with-jwt-3mdi
// https://www.apollographql.com/blog/backend/auth/setting-up-authentication-and-authorization-apollo-federation/
