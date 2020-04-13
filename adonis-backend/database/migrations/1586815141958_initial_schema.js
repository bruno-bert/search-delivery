"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class DeliverySchema extends Schema {
  up() {
    this.create("cities", collection => {});

    this.create("users", collection => {
      collection.index("email_index", { email: 1 }, { unique: true });
    });

    this.create("tokens", collection => {
      collection.index("token_index", { token: 1 }, { unique: true });
    });

    this.create("segments", collection => {
      collection.index("name_index", { name: 1 }, { unique: true });
    });

    this.create("shops", collection => {
      collection.index(
        "geo_index",
        { location: "2dsphere" },
        { "2dsphereIndexVersion": 2 }
      );
    });
  }

  down() {
    this.drop("users", "tokens", "shops", "cities", "segments");
  }
}

module.exports = DeliverySchema;
