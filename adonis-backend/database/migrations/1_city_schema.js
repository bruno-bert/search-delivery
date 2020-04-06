"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CitySchema extends Schema {
  up() {
    this.create("cities", table => {
      table.increments();
      table.json("geo").notNullable();
      table.string("name", 100).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("cities");
  }
}

module.exports = CitySchema;
