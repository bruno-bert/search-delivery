"use strict";

const Shop = use("App/Models/Shop");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with shops
 */
class ShopController {
  /**
   * Show a list of all shops.
   * GET shops
   *
   */
  async index() {
    const shops = Shop.query()
      .with("city")
      .with("segment")
      .fetch();
    return shops;
  }

  /**
   * Create/save a new shop.
   * POST shops
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.all();
    const shop = await Shop.create({
      isNew: true,
      createdBy: auth.user.id,
      ...data
    });
    return shop;
  }

  /**
   * Display a single shop.
   * GET shops/:id
   *
   * @param {object} ctx
   * @param {object} params
   */
  async show({ params }) {
    const shop = await Shop.findOrFail(params.id);
    return shop;
  }

  /**
   * Update shop details.
   * PUT or PATCH shops/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const shop = await Shop.findOrFail(params.id);
    const data = request.all();

    /** do not allow user to update a shop from oher user */
    if (auth.user.id !== shop.createdBy) {
      return response.status(401);
    }

    shop.merge(data);
    await shop.save();
    return shop;
  }

  /**
   * Delete a shop with id.
   * DELETE shops/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const shop = await Shop.findOrFail(id);
    const copy = { ...shop };

    /** do not allow user to delete a shop from oher user */
    if (auth.user.id !== shop.createdBy) {
      return response.status(401);
    }

    await shop.delete();
    return copy;
    // response.status(200).json(result);
  }
}

module.exports = ShopController;
