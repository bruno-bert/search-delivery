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

Route.group(() => {
  Route.get("/cities", "CityController.index");
  Route.post("/city", "CityController.store");
}).prefix("api/v1");

Route.group(() => {
  Route.get("/segments", "SegmentController.index");
  Route.post("/segment", "SegmentController.store");
}).prefix("api/v1");

Route.group(() => {
  Route.resource("shops", "ShopController").apiOnly();
}).prefix("api/v1");
