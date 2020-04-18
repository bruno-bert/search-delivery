"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Segment = use("App/Models/Segment");

/**
 * Resourceful controller for interacting with segments
 */
class SegmentController {
  /**
   * Show a list of all segments.
   * GET segments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
  
   */
  async index({ request, response }) {
    const segments = await Segment.all();
    return segments;
  }

  async store({ request }) {
    const data = request.only(["name"]);
    const segment = await Segment.create({ ...data });
    return segment;
  }
}

module.exports = SegmentController;
