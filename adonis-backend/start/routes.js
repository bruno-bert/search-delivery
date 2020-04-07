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

Route.post("/authenticate", "AuthController.authenticate");
Route.post("/register", "AuthController.register");
Route.get("register/confirm/:token", "AuthController.confirmEmail");

/** Password Reset routes */
/** this route is sent by client to the backend - the backend will send the reset email with a link to the client and the token */
Route.post("password-reset/email", "AuthController.sendResetLinkEmail");

/** this route is sent by client in the reset form screen, the client will send to adonis the token to reset the password and the new password */
Route.post("password-reset/confirm", "AuthController.confirmPasswordReset");
/** END Password Reset routes */

Route.post("password-change", "AuthController.changePassword").middleware(
  "auth"
);

Route.post("logout", "AuthController.logout").middleware("auth");

Route.group(() => {
  Route.get("/cities", "CityController.index");
  Route.post("/city", "CityController.store");
}).middleware("auth");

Route.group(() => {
  Route.get("/segments", "SegmentController.index");
  Route.post("/segment", "SegmentController.store");
}).middleware("auth");

Route.group(() => {
  Route.resource("shops", "ShopController").apiOnly();
}).middleware("auth");

Route.get("google", async ({ ally }) => {
  console.log("tentando autenticar no google");
  await ally.driver("google").redirect();
});

Route.get("authenticated/google", async ({ ally }) => {
  console.log("autenticou no google");
  const user = await ally.driver("google").getUser();
  return user;
});
