"use strict";

const Config = use("Config");
const authMechanism = Config.get("auth.authenticator");
const Redis = use("Redis");

class AddTokenToBlackList {
  async handle({ auth }, next) {
    if (authMechanism !== "jwt") await next();
    const token = auth.getAuthHeader();
    if (token) await Redis.lpush("blacklist", token);
    await next();
  }
}

module.exports = AddTokenToBlackList;
