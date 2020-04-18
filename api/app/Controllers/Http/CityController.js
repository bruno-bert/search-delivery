"use strict";

const City = use("App/Models/City");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with cities
 */
class CityController {
  /**
   * Show a list of all cities.
   * GET cities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index() {
    const cities = await City.all();
    return cities;
  }

  async store({ request }) {
    const data = request.only(["geo", "name"]);
    const city = await City.create({ ...data });
    return city;
  }
}

module.exports = CityController;
