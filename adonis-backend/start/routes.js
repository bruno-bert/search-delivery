"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");
const Config = use("Config");

const authMechanism = Config.get("auth.authenticator");

if (authMechanism === "session") {
  Route.post("authenticate", "Auth/LoginController.login");
  Route.post("register", "Auth/RegisterController.register");
  Route.post("logout", "Auth/LogoutController.logout").middleware("auth");
} else {
  Route.post("authenticate", "Auth/JwtLoginController.login").middleware(
    "add_existing_token_to_blacklist"
  );
  Route.post("register", "Auth/JwtRegisterController.register");
  Route.post("logout", "Auth/JwtLogoutController.logout")
    .middleware("auth")
    .middleware("check_token_on_blacklist");
}

Route.get("register/confirm/:token", "Auth/RegisterController.confirmAccount");

Route.post(
  "register/confirm/email",
  "Auth/ConfirmationMailController.sendConfirmationEmail"
)
  .middleware("auth")
  .middleware("check_token_on_blacklist");

/** Password Reset routes */
/** this route is sent by client to the backend - the backend will send the reset email with a link to the client and the token */
Route.post(
  "password-reset/email",
  "Auth/PasswordResetController.sendResetLinkEmail"
);

/** this route is sent by client in the reset form screen, the client will send to adonis the token to reset the password and the new password */
Route.post(
  "password-reset/confirm",
  "Auth/PasswordResetController.confirmPasswordReset"
);
/** END Password Reset routes */

Route.post("password-change", "Auth/ChangePasswordController.changePassword")
  .middleware("auth")
  .middleware("check_token_on_blacklist");

Route.get("google", "Auth/GoogleAuthController.login");

Route.get("authenticated/google", "Auth/GoogleAuthController.callback");

Route.group(() => {
  Route.get("/cities", "CityController.index");
  Route.post("/city", "CityController.store");
})
  .middleware("auth")
  .middleware("check_token_on_blacklist");

Route.group(() => {
  Route.get("/segments", "SegmentController.index");
  Route.post("/segment", "SegmentController.store");
})
  .middleware("auth")
  .middleware("check_token_on_blacklist");

Route.group(() => {
  Route.resource("shops", "ShopController").apiOnly();
})
  .middleware("auth")
  .middleware("check_token_on_blacklist");
