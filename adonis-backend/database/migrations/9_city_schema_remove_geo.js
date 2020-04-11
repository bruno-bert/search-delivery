"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CitySchema extends Schema {
  up() {
    this.alter("cities", table => {
      table.dropColumn("geo");
    });
  }

  down() {
    this.alter("cities", table => {
      table.json("geo");
    });
  }
}

module.exports = CitySchema;
