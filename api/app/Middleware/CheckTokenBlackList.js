"use strict";

const Config = use("Config");
const authMechanism = Config.get("auth.authenticator");
const Redis = use("Redis");

class CheckTokenBlackList {
  async handle({ response, auth }, next) {
    if (authMechanism !== "jwt") await next();

    const token = auth.getAuthHeader();

    const result = await Redis.lrange("blacklist", 0, -1);
    if (result.indexOf(token) > -1) {
      return response.status(401).json({
        status: 401,
        message: "Invalid Token"
      });
    }

    await next();
  }
}

module.exports = CheckTokenBlackList;
