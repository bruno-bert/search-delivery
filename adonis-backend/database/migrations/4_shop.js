"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ShopSchema extends Schema {
  up() {
    this.create("shops", table => {
      table.increments();
      table
        .string("name", 50)
        .notNullable()
        .unique();
      table.string("description", 254).nullable();
      table.integer("likes").nullable();
      table.integer("dislikes").nullable();
      table.decimal("rating").nullable();
      table.integer("minTimeToDeliver").nullable();
      table.integer("maxTimeToDeliver").nullable();
      table.decimal("rateToDeliver").nullable();
      table
        .integer("city_id")
        .unsigned()
        .references("id")
        .inTable("cities");
      table
        .integer("segment_id")
        .unsigned()
        .references("id")
        .inTable("segments");
      table.json("contacts").notNullable();
      table
        .boolean("isNew")
        .notNullable()
        .defaultTo(true);
      table.string("createdBy").notNullable();

      table.timestamps();
    });
  }

  down() {
    this.drop("shops");
  }
}

module.exports = ShopSchema;
