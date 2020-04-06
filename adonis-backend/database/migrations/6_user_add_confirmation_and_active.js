"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.drop("users");

    this.create("users", table => {
      table.increments();
      table.string("name", 80).notNullable();

      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.string("provider", 80).notNullable();

      table
        .boolean("isActive")
        .notNullable()
        .defaultTo(false);

      table.string("confirmation_token");

      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
