"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Shop extends Model {
  city() {
    return this.belongsTo("App/Models/City");
  }

  segment() {
    return this.belongsTo("App/Models/Segment");
  }
}

module.exports = Shop;
