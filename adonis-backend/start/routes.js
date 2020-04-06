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

Route.post("/register", "AuthController.register");
Route.post("/authenticate", "AuthController.authenticate");
Route.get("register/confirm/:token", "AuthController.confirmEmail");

Route.group(() => {
  Route.get("/cities", "CityController.index");
  Route.post("/city", "CityController.store");
})
  .middleware("auth")
  .prefix("api/v1");

Route.group(() => {
  Route.get("/segments", "SegmentController.index");
  Route.post("/segment", "SegmentController.store");
})
  .middleware("auth")
  .prefix("api/v1");

Route.group(() => {
  Route.resource("shops", "ShopController").apiOnly();
})
  .middleware("auth")
  .prefix("api/v1");
