"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SegmentSchema extends Schema {
  up() {
    this.create("segments", table => {
      table.increments();
      table.string("name", 100).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("segments");
  }
}

module.exports = SegmentSchema;
