"use strict";

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use("Env");

module.exports = {
  /*
  |--------------------------------------------------------------------------
  | Authenticator
  |--------------------------------------------------------------------------
  |
  | Authentication is a combination of serializer and scheme with extra
  | config to define on how to authenticate a user.
  |
  | Available Schemes - basic, session, jwt, api
  | Available Serializers - lucid, database
  |
  */
  authenticator: Env.get("AUTH_MECHANISM") || "session",

  /*
  |--------------------------------------------------------------------------
  | Extends
  |--------------------------------------------------------------------------
  |
  | These are custom extensions that affect other auth behaviors implemented in application level
  |
  */
  extends: {
    requiresAccountActivation: Env.get("AUTH_REQUIRES_ACCOUNT_ACTIVATION")
  },

  /*
  |--------------------------------------------------------------------------
  | Session
  |--------------------------------------------------------------------------
  |
  | Session authenticator makes use of sessions to authenticate a user.
  | Session authentication is always persistent.
  |
  */
  session: {
    //serializer: "lucid",
    serializer: "LucidMongo",
    model: "App/Models/User",
    token: "App/Models/Token",
    scheme: "session",
    uid: "email",
    password: "password"
  },

  /*
  |--------------------------------------------------------------------------
  | Basic Auth
  |--------------------------------------------------------------------------
  |
  | The basic auth authenticator uses basic auth header to authenticate a
  | user.
  |
  | NOTE:
  | This scheme is not persistent and users are supposed to pass
  | login credentials on each request.
  |
  */
  basic: {
    serializer: "lucid",
    model: "App/Models/User",
    scheme: "basic",
    uid: "email",
    password: "password"
  },

  /*
  |--------------------------------------------------------------------------
  | Jwt
  |--------------------------------------------------------------------------
  |
  | The jwt authenticator works by passing a jwt token on each HTTP request
  | via HTTP `Authorization` header.
  |
  */
  jwt: {
    serializer: "LucidMongo",
    //serializer: "lucid",
    model: "App/Models/User",
    token: "App/Models/Token",
    scheme: "jwt",
    uid: "email",
    password: "password",
    options: {
      secret: Env.get("APP_KEY"),
      expiresIn: Env.get("JWT_TOKEN_EXPIRATION_IN_SECONDS") //seconds (1 day)
    }
  },

  /*
  |--------------------------------------------------------------------------
  | Api
  |--------------------------------------------------------------------------
  |
  | The Api scheme makes use of API personal tokens to authenticate a user.
  |
  */
  api: {
    serializer: "lucid",
    model: "App/Models/User",
    scheme: "api",
    uid: "email",
    password: "password"
  }
};
